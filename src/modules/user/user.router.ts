import express from "express";
import auth, { UserRole } from "../../middleware/auth.middleware";
import { userController } from "./user.controller";

export const userRouter = express.Router();

userRouter.get("/", auth(UserRole.ADMIN), userController.getUsers);
userRouter.get("/:id", auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SELLER), userController.getUserById);
userRouter.patch("/:id", auth(UserRole.ADMIN), userController.updateUserById);
userRouter.delete("/:id", auth(UserRole.ADMIN), userController.deleteUserById);