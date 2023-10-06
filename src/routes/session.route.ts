import { Router } from "express";
import { sessionControllers } from "../controllers";
import middlewares from "../middlewares";
import { sessionSchemas } from "../schemas";

export const sessionRouter: Router = Router();

sessionRouter.post(
  "",
  middlewares.validateBody(sessionSchemas),
  sessionControllers.create
);
