import express from "express";
import { createUserController, deleteUserController, findAllUsersController, findOneUserController, updateUserController } from "../Controllers/UserController";
import { forgetPasswordController, signInController } from "../Controllers/SignInController/SignInController";
import { createExpense, deleteExpense, findAllExpense } from "../Controllers/ExpenseController";
import { createTasks, deleteTask, findAllTasks, updateTask } from "../Controllers/TasksController";
import { verifyJWT } from "../Middleware/veryfyToken";

const router = express.Router();

router.post("/create-user", verifyJWT, createUserController)
router.get("/find-all-users", verifyJWT, findAllUsersController)
router.get("/find-one-user/:id", verifyJWT, findOneUserController)
router.patch("/update-user/:id", verifyJWT, updateUserController)
router.delete("/delete-user/:id", verifyJWT, deleteUserController)

router.post('/auth-signin', signInController);
router.post('/auth-forget-pass', forgetPasswordController);

router.post('/create-expense', verifyJWT, createExpense);
router.get('/find-all-expense/:id', verifyJWT, findAllExpense);
router.delete('/delete-expense/:id', verifyJWT, deleteExpense);

router.post('/create-task', verifyJWT, createTasks);
router.get('/find-all-tasks/:id', verifyJWT, findAllTasks);
router.patch('/update-tasks/:id', verifyJWT, updateTask);
router.delete('/delete-task/:id', verifyJWT, deleteTask);

export default router;