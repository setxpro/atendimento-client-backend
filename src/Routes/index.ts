import express from "express";
import { createUserController, deleteUserController, findAllUsersController, findOneUserController, updateUserController } from "../Controllers/UserController";
import { forgetPasswordController, signInController } from "../Controllers/SignInController/SignInController";

const router = express.Router();

router.post("/create-user", createUserController)
router.get("/find-all-users", findAllUsersController)
router.get("/find-one-user/:id", findOneUserController)
router.patch("/update-user/:id", updateUserController)
router.delete("/delete-user/:id", deleteUserController)

router.post('/auth-signin', signInController);
router.post('/auth-forget-pass', forgetPasswordController);

export default router;