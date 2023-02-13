import { Request, Response } from "express";
import { Expense } from "../../Models/Expense";

export const createExpense = async (req: Request, res: Response) => {
    const {
        userID,
        date,
        category,
        title,
        price
    } = req.body;

    // Validations

    // 

    const expense = {
        userID,
        date,
        category,
        title,
        price,
    }

    try {

        await Expense.create(expense);

        res.status(200).json({status: true, message: "Inserido com sucesso!"})
        
    } catch (error) {
        
    }

}

export const findAllExpense = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const expense = await Expense.find({userID: id});
        res.status(200).json(expense)
    } catch (error) {
        
    }
}

export const deleteExpense = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await Expense.deleteOne({ _id: id });
        res.status(200).json({status: true, message: "Despesa deletada com sucesso!"})
    } catch (error) {
        
    }
}