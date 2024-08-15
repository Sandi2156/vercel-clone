import { v4 as uuidv4 } from "uuid";

import sessionRepository from "../repository/session";
import { Types } from "mongoose";

async function createSession(userId: Types.ObjectId) {
  const sessionId = uuidv4();

  try {
    const existingSession = await sessionRepository.findSessionEntryForAUserser(
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

export default {
  createSession,
};
