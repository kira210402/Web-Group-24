import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import folderController from "../controllers/folder.controller.js";
const folderRouter = express.Router();

folderRouter.get("/", authMiddleware.verifyToken, folderController.getAll);
folderRouter.get("/:id", authMiddleware.verifyToken, folderController.getOne);
folderRouter.post("/", authMiddleware.verifyToken, folderController.create);
folderRouter.put("/:id", authMiddleware.verifyToken, folderController.update);
folderRouter.delete("/:id", authMiddleware.verifyToken, folderController.deleteFolder);

export default folderRouter;