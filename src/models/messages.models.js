import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
  message:[{message:String, username: String, time: Number}]
});

export const Messages = mongoose.model("Messages", messagesSchema);
