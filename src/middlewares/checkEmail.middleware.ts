import { NextFunction, Request, Response } from "express";
import { UserRepo } from "../interfaces";
import { User } from "../entities";
import { AppError } from "../errors";
import { usersRepository } from "../repositories";

const checkEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  if (email) {
    const repo: UserRepo = usersRepository;
    const user: User | null = await repo.findOneBy({ email });
    if (user) throw new AppError("Email already exists", 409);
  }
  return next();
};

export { checkEmail };
