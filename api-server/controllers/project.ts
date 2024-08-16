import { Request, Response } from "express";

import projectService from "../services/project";

type DeployProjectReqBody = { gitURL: string; existingSlug?: string };
type StoreProjectReqBody = {
  projectId?: string;
  projectLink?: string;
  user: any;
};

async function deployProject(req: Request, res: Response) {
  const { gitURL, existingSlug }: DeployProjectReqBody = req.body;

  if (!gitURL) {
    res.status(400).json({
      message: "GIT url is required.",
    });
  }

  const response = await projectService.deployProject(gitURL, existingSlug);

  return res.status(201).json(response);
}

async function storeProject(req: Request, res: Response) {
  const { projectId, projectLink, user }: StoreProjectReqBody = req.body;

  if (!projectId)
    return res.status(400).json({
      message: "projectId is required",
    });

  if (!projectLink)
    return res.status(400).json({
      message: "projectLink is required",
    });

  await projectService.storeProject(projectId, projectLink, user._id);

  return res.status(201).json({
    message: "project is stored",
  });
}

async function getProjects(req: Request, res: Response) {
  const { user }: StoreProjectReqBody = req.body;

  const response = await projectService.getProjectsByUserId(user._id);

  return res.status(201).json({
    data: response,
  });
}

export default { deployProject, storeProject, getProjects };
