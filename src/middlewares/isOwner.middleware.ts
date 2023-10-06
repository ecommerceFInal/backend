import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const isOwner = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const foundId = res.locals.user.id;
  const { id } = req.params;
  if (foundId !== id) {
    throw new AppError("Insufficient permission", 403);
  }
  return next();
};
