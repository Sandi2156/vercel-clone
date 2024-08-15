import userRepository from "../repository/user";

async function signUp(email: string, password: string) {
  await userRepository.signUp(email, password);
}

async function signIn(email: string, password: string) {
  const user = await userRepository.signIn(email, password);

  if (user && !user.length)
    return {
      message: "user not found",
      status: 404,
    };

  return {
    message: "user is logged in",
    status: 200,
  };
}

export default {
  signUp,
  signIn,
};
