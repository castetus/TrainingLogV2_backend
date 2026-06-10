export const getCurrentUser = async (req: FastifyRequest, res: FastifyReply) => {
  const user = await authService.getUserById(req.user.id);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  return res.send({ data: user });
};