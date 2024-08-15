import userRepository from "../repository/user";
import sessionService from "./session";

async function signUp(email: string, password: string) {
  await userRepository.signUp(email, password);
}

async function signIn(email: string, password: string) {
  const user = await userRepository.signIn(email, password);

  if (!user || (user && !user.length))
    return {
      message: "user not found",
      status: 404,
    };

  await sessionService.createSession(user[0]._id);

  return {
    message: "user is logged in",
    status: 200,
  };
}

export default {
  signUp,
  signIn,
};
