import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "invalid token",
    });
  }

  const splitedToken = token.split(" ")[1];

  jwt.verify(
    splitedToken,
    process.env.SECRET_KEY!,
    (error: any, decoded: any) => {
      if (error) {
        return res.status(401).json({
          message: "invalid token",
        });
      }

      res.locals.user = {
        id: decoded.sub,
      };
    }
  );

  return next();
};
