import mongodb from "../integrations/mongodb";
import ProjectModel from "../models/project";

async function storeProject(
  projectId: string,
  projectLink: string,
  userId: string
) {
  try {
    await mongodb.connect();

    await ProjectModel.create({
      projectId,
      projectLink,
      userId,
    });
  } catch (error) {
    console.log(error);
  }
}

async function getProjectsByUserId(userId: string) {
  try {
    await mongodb.connect();

    return await ProjectModel.find({ userId });
  } catch (error) {
    console.log(error);
  }
}

export default {
  storeProject,
  getProjectsByUserId,
};
