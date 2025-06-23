import mongoose from "mongoose";
const contentTypes = ["youtube", "tweeter"];

const contentSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: contentTypes,
    },
    title: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Content =
  mongoose.models.Content || mongoose.model("Content", contentSchema);
export default Content;
