import mongodb from "../integrations/mongodb";
import ProjectModel from "../models/project";

async function storeProject(
  projectId: string,
  projectLink: string,
  userId: string
) {
  await mongodb.connect();

  await ProjectModel.create({
    projectId,
    projectLink,
    userId,
  });
}

async function getProjectsByUserId(userId: string) {
  await mongodb.connect();

  return await ProjectModel.find({ userId });
}

export default {
  storeProject,
  getProjectsByUserId,
};
