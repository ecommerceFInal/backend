import { sign } from "jsonwebtoken";
import { User } from "../entities";
import { AppError } from "../errors";
import { SessionCreate, SessionReturn } from "../interfaces";
import { usersRepository } from "../repositories";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const create = async ({
  email,
  password,
}: SessionCreate): Promise<SessionReturn> => {
  const foundUser: User | null = await usersRepository.findOneBy({ email });
  if (!foundUser) throw new AppError("Invalid credentials", 401);

  const samePwd: boolean = await compare(password, foundUser.password);
  if (!samePwd) throw new AppError("Invalid credentials", 401);

  const token = jwt.sign({ id: foundUser.id }, process.env.SECRET_KEY!, {
    subject: foundUser.id,
    expiresIn: process.env.EXPIRES_IN!,
  });

  return { token };
};

export default { create };
