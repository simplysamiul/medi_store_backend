import { Request, Response } from "express";
import { userService } from "./user.service";

const getUsers = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUsers();

        res.status(200).json({
            success: true,
            message: "Users retrive successfully..!",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Users retrive failed..!",
            data: null,
            error: error
        })
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            res.status(500).json({
                success: false,
                message: "Please provide valid useer id..!",
                data: null,
            })
        }

        const user = await userService.getUserById(userId as string);

        res.status(200).json({
            success: true,
            message: "User retrive successfully..!",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User retrive failed..!",
            data: null,
            error: error
        })
    }
};


export const userController = {
    getUsers,
    getUserById
}