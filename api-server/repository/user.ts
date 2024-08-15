import mongodb from "../integrations/mongodb";
import UserModel from "../models/user";

async function signUp(email: string, password: string) {
  try {
    await mongodb.connect();

    await UserModel.create({
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
}

async function signIn(email: string, password: string) {
  try {
    await mongodb.connect();

    return await UserModel.find({
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
}

export default {
  signUp,
  signIn,
};
