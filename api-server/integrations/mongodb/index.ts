import mongoose from "mongoose";

import mongodb from "../../config/mongodb";

async function connect() {
  try {
    console.log("connection: ", mongodb.CONNECTION_STRING);
    await mongoose.connect(mongodb.CONNECTION_STRING);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error while connecting mongodb", error);
  }
}

export default {
  connect,
};
