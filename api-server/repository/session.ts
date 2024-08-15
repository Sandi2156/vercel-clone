import mongodb from "../integrations/mongodb";
import { Types } from "mongoose";

import SessionModel from "../models/session";

async function findSessionEntryForAUserser(userId: Types.ObjectId) {
  try {
    await mongodb.connect();

    return await SessionModel.find({ userId });
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

export default {
  createSession,
  findSessionEntryForAUserser,
};
