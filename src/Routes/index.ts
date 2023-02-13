import express from "express";
import { createUserController, deleteUserController, findAllUsersController, findOneUserController, updateUserController } from "../Controllers/UserController";
import { forgetPasswordController, signInController } from "../Controllers/SignInController/SignInController";
import { createExpense, deleteExpense, findAllExpense } from "../Controllers/ExpenseController";
import { createTasks, deleteTask, findAllTasks } from "../Controllers/TasksController";

const router = express.Router();

router.post("/create-user", createUserController)
router.get("/find-all-users", findAllUsersController)
router.get("/find-one-user/:id", findOneUserController)
router.patch("/update-user/:id", updateUserController)
router.delete("/delete-user/:id", deleteUserController)

router.post('/auth-signin', signInController);
router.post('/auth-forget-pass', forgetPasswordController);

router.post('/create-expense', createExpense);
router.get('/find-all-expense/:id', findAllExpense);
router.delete('/delete-expense/:id', deleteExpense);

router.post('/create-task', createTasks);
router.get('/find-all-tasks/:id', findAllTasks);
router.delete('/delete-task/:id', deleteTask);

export default router;