import { Router } from "express";
import * as adminController from "../controllers/admin";
import { privateRoute } from "../middlewares/private-route";

export const adminRoutes = Router();

adminRoutes.post("/posts", privateRoute, adminController.addEvent);
adminRoutes.get("/posts/:id", privateRoute, adminController.getEvent);
