import { v4 as uuidv4 } from "uuid";

import sessionRepository from "../repository/session";
import { Types } from "mongoose";

async function createSession(userId: Types.ObjectId) {
  const sessionId = uuidv4();

  try {
    const existingSession = await sessionRepository.findSessionEntryForAUser(
      userId
    );

    if (existingSession && existingSession.length > 0)
      return existingSession[0].sessionId;

    await sessionRepository.createSession(sessionId, userId);

    return sessionId;
  } catch (error) {
    console.log(error);
  }
}

async function findUserForASessionId(sessionId: string) {
  return await sessionRepository.findUserForASessionId(sessionId);
}

async function removeSession(sessionId: string) {
  try {
    await sessionRepository.removeSession(sessionId);
  } catch (error) {
    console.log(error);
  }
}

export default {
  createSession,
  findUserForASessionId,
  removeSession,
};
