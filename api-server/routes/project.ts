import express from "express";

import projectController from "../controllers/project";

const projectRouter = express.Router();

projectRouter
  .post("/", projectController.deployProject)
  .post("/store", projectController.storeProject)
  .get("/", projectController.getProjects);

export default projectRouter;
