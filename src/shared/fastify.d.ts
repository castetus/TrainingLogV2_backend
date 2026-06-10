import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      userId: string;
    };
  }
  interface FastifyReply {
    setAccessToken(token: string): void;
    setRefreshToken(token: string): void;
    clearAuthCookies(): void;
  }
}