import { Schema, model } from "mongoose";

interface UserProps {
  name: string;
  middlename: string;
  email: string;
  login: string;
  password: string;
  assignments: string;
  avatar: string;
  role: string;
}

const userSchema = new Schema<UserProps>({
  name: { type: String, required: true },
  middlename: { type: String, required: true },
  email: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  assignments: { type: String, required: true },
  role: {type: String, required: true},
  avatar: String,
});

export const User = model<UserProps>("User", userSchema);

