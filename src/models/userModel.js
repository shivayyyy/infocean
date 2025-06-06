import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: Number,
      required: true,

      trim: true,
    },
    password: {
      type: String,
      required: true,

      trim: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema) || mongoose.model.User;
export default User;
