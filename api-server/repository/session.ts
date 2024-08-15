import mongodb from "../integrations/mongodb";
import { Types } from "mongoose";

import SessionModel from "../models/session";

async function findSessionEntryForAUser(userId: Types.ObjectId) {
  try {
    await mongodb.connect();

    return await SessionModel.find({ userId });
  } catch (error) {
    console.log(error);
  }
}

async function findUserForASessionId(sessionId: string) {
  try {
    await mongodb.connect();

    return await SessionModel.find({ sessionId }).populate("userId");
  } catch (error) {
    console.log(error);
  }
}

async function createSession(sessionId: string, userId: Types.ObjectId) {
  try {
    await mongodb.connect();

    const session = new SessionModel({ sessionId, userId });

    await session.save();
  } catch (error) {
    console.log(error);
  }
}

async function removeSession(sessionId: string) {
  try {
    await mongodb.connect();

    await SessionModel.deleteOne({ sessionId });
  } catch (error) {
    console.log(error);
  }
}

export default {
  createSession,
  findSessionEntryForAUser,
  findUserForASessionId,
  removeSession,
};
