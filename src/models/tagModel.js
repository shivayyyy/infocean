import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  title: {
    type: [String],
    default: [],
    trim: true,
    required: false,
  },
});

const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);
export default Tag;
