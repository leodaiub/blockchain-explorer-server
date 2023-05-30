import { compare } from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<null> => {
  const passwordMatch = await compare(password, hashedPassword);
  if (!passwordMatch) {
    throw new UnauthorizedException('Invalid password');
  }
  return;
};
