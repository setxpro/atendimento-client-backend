import { Schema, model } from "mongoose";

interface TaskProps {
  userID: string;
  date: Date;
  task: string;
  isCompleted: boolean;
}

const taskSchema = new Schema<TaskProps>({
    userID: { type: String, required: true },
    date: { type: Date, required: true },
    task: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
});

export const Task = model<TaskProps>("Task", taskSchema);