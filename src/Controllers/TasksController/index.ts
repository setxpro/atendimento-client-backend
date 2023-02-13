import { Request, Response } from "express";
import { Task } from "../../Models/Tasks";

export const createTasks = async (req: Request, res: Response) => {
  const { userID, date, task } = req.body;

  // Validations

  // Object Task

  const tasks = {
    userID, 
    date, 
    task, 
    isCompleted: false
  }

  try {
      // Validations on tasks db
      await Task.create(tasks)
      res.status(200).json({status: true, message: "Tarefa criada com sucesso!"})
  } catch (error) {
      
  }

};

export const findAllTasks = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const task = await Task.find({userID: id});
        res.status(200).json(task)
    } catch (error) {
        
    }
}

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
      await Task.deleteOne({ _id: id });
      res.status(200).json({status: true, message: "Tarefa deletada com sucesso!"})
  } catch (error) {
      
  }
}