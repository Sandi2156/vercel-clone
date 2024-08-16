import userRepository from "../repository/user";
import sessionService from "./session";
import bcrypt from "../lib/bcrypt";

async function signUp(email: string, password: string) {
  const hashedPassword = await bcrypt.getHashedPassword(password);

  await userRepository.signUp(email, hashedPassword);
}

async function signIn(email: string, password: string) {
  const user = await userRepository.signIn(email);

  if (!user || (user && !user.length))
    return {
      message: "user not found",
      status: 404,
    };

  const isPasswordMatched = await bcrypt.comparePassword(
    password,
    user[0].password
  );

  if (!isPasswordMatched)
    return {
      message: "password is not matched",
      status: 400,
    };

  const sessionId = await sessionService.createSession(user[0]._id);

  return {
    message: "user is logged in",
    status: 200,
    sessionId,
  };
}

async function signOut(sessionId: string) {
  try {
    await sessionService.removeSession(sessionId);
  } catch (error) {
    console.log(error);
  }
}

export default {
  signUp,
  signIn,
  signOut,
};
