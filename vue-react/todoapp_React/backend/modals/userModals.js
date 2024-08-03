import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Geben Sie bitte Ihr Name ein!"],
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: [true, "Geben Sie bitte Ihr Passwort ein!"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
