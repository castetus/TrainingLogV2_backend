import { FastifyReply, FastifyRequest } from "fastify";
import { GoogleCallbackQuery, LoginRequest, RegisterRequest } from "./auth.types";
import { authService } from "./auth.service";
import 'dotenv/config';
import { clearAuthCookies, setAuthCookies } from "@/auth/auth.cookies";
import { verifyRefreshToken } from "./auth.tokens";
import { REFRESH_TOKEN_COOKIE, GOOGLE_AUTH_ERROR, GOOGLE_AUTH_SUCCESS } from "./auth.constants";
import { OAuth2Client } from "google-auth-library";


export const getCurrentUser = async (req: FastifyRequest, res: FastifyReply) => {
  const user = await authService.getUserById(req.user.userId);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  return res.send({ data: user });
};

export const register = async (req: FastifyRequest<{ Body: RegisterRequest }>, res: FastifyReply) => {
  const { name, email, password } = req.body;
  const newUser = await authService.register({ name, email, password });
  if (!newUser) {
    return res.status(409).send({ message: 'User with this email already exists' });
  }
  setAuthCookies(
    res,
    newUser.accessToken,
    newUser.refreshToken,
  );
  return res.send({ data: newUser });
};

export const login = async (req: FastifyRequest<{ Body: LoginRequest }>, res: FastifyReply) => {
  const { login, password } = req.body;
  const user = await authService.login({ login, password });
  if (!user) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }
  setAuthCookies(
    res,
    user.accessToken,
    user.refreshToken,
  );
  
  return res.send({
    data: {
      user,
    },
  });
};

export const logout = async (req: FastifyRequest, res: FastifyReply) => {

  const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];

  const payload = verifyRefreshToken(refreshToken);
  authService.logoutUser(payload.sessionId);
  clearAuthCookies(res);

  res.send({ message: 'Logged out successfully' });
};

export const checkRefreshToken = async (req: FastifyRequest, res: FastifyReply) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];

  if (!refreshToken) {
    return res.status(401).send({ message: 'No refresh token provided' });
  }
};

export const redirectToGoogle = async (req: FastifyRequest, res: FastifyReply) => {
  const url = new URL(
    'https://accounts.google.com/o/oauth2/v2/auth'
  );
  
  url.searchParams.set(
    'client_id',
    process.env.GOOGLE_CLIENT_ID!,
  );
  
  url.searchParams.set(
    'redirect_uri',
    process.env.GOOGLE_REDIRECT_URI!,
  );
  
  url.searchParams.set(
    'response_type',
    'code',
  );
  
  url.searchParams.set(
    'scope',
    'openid email profile',
  );

  return res.redirect(url.toString());
};

const sendGoogleAuthResult = (
  res: FastifyReply,
  type: typeof GOOGLE_AUTH_SUCCESS | typeof GOOGLE_AUTH_ERROR,
  message?: string,
) => {
  return res.type('text/html').send(`
    <script>
      window.opener.postMessage(
        {
          type: '${type}',
          message: ${JSON.stringify(message ?? '')}
        },
        '${process.env.FRONTEND_URL}'
      );

      window.close();
    </script>
  `);
};

export const googleCallback = async (req: FastifyRequest<{
  Querystring: GoogleCallbackQuery;
}>, res: FastifyReply) => {

  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );

  const { code, state } = req.query;

  if (!code) {
    return res.code(400).send({ message: 'Missing code' });
  }

  const { tokens } = await client.getToken(code);

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token!,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  
  if (payload) {
    const user = await authService.findOrCreateGoogleUser({
      googleId: payload.sub,
      email: payload.email!,
      name: payload.name!,
    });

    setAuthCookies(res, user.accessToken, user.refreshToken);

    return sendGoogleAuthResult(res, GOOGLE_AUTH_SUCCESS);
  }

  return sendGoogleAuthResult(res, GOOGLE_AUTH_ERROR, 'Google auth failed');
};