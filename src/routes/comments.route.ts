import { Router } from "express";
import { commentsControllers } from "../controllers";
import middlewares from "../middlewares";
import { commentsReturnSchema } from "../schemas";

export const commentRoutes: Router = Router();

commentRoutes.get("/:id", commentsControllers.read);

commentRoutes.use("", middlewares.checkToken);

commentRoutes.post(
  "/:id",
  middlewares.checkToken,
  middlewares.validateBody(commentsReturnSchema),
  commentsControllers.create
);

commentRoutes.patch(
  "/:id",
  middlewares.validateBody(commentsReturnSchema),
  commentsControllers.update
);

commentRoutes.delete(
  "/:id",
  middlewares.validateBody(commentsReturnSchema),
  commentsControllers.destroy
);
