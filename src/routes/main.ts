import { Router } from "express";
import * as mainController from "../controllers/main";

export const mainRoutes = Router();

mainRoutes.post("/participant", mainController.sigUpParticipant);
