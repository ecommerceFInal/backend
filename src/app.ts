import "express-async-errors";
import express, { Application, json } from "express";
import {
  announcementRoutes,
  commentRoutes,
  sessionRouter,
  userRouter,
} from "./routes";
import middlewares from "./middlewares";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/announcements", announcementRoutes);
app.use("/comments", commentRoutes);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(middlewares.handleError);

export default app;
