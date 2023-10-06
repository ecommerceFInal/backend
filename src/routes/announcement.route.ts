import { Router } from "express";
import { anouncementsControllers } from "../controllers";
import middlewares from "../middlewares";
import {
  announcementsUpdateSchema,
  anouncementsCreateSchema,
} from "../schemas";

export const announcementRoutes: Router = Router();

announcementRoutes.get("", anouncementsControllers.read);
announcementRoutes.post(
  "",
  middlewares.checkId,
  middlewares.validateBody(anouncementsCreateSchema),
  anouncementsControllers.create
),
  announcementRoutes.use("", middlewares.checkToken);

announcementRoutes.patch(
  "/:id",
  middlewares.validateBody(announcementsUpdateSchema),
  anouncementsControllers.update
);

announcementRoutes.delete("/:id", anouncementsControllers.destroy);
