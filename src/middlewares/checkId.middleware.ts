import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { usersRepository } from "../repositories";
import { AppError } from "../errors";

export const checkId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: string = req.params.id;

  const foundId: User | null = await usersRepository.findOneBy({ id });
  if (!foundId) throw new AppError("User not found", 404);

  res.locals = { ...res.locals, foundId };

  return next();
};
