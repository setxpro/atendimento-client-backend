import { Schema, model } from "mongoose";

interface ExpenseProps {
  userID: string;
  date: Date;
  category: string;
  title: string;
  price: number;
}

const expenseSchema = new Schema<ExpenseProps>({
    userID: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true }
});

export const Expense = model<ExpenseProps>("Expense", expenseSchema);