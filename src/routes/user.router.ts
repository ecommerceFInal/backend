import { Router } from "express";
import middlewares from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas";
import { userControllers } from "../controllers";

export const userRouter: Router = Router();

userRouter.post(
  "",
  middlewares.validateBody(userCreateSchema),
  middlewares.checkEmail,
  userControllers.create
);

userRouter.use("/:id", middlewares.checkId);

userRouter.patch(
  "/:id",
  middlewares.validateBody(userUpdateSchema),
  middlewares.checkToken,
  middlewares.isOwner,
  userControllers.update
);
userRouter.delete(
  "/:id",
  middlewares.checkToken,
  middlewares.isOwner,
  userControllers.destroy
);
