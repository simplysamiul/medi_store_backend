import { User } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getUsers = async ()=> {
    const result = await prisma.user.findMany();
    return result;
};

const getUserById = async (userId:string)=> {
    const result = await prisma.user.findUnique({
        where: {
            id:userId
        }
    });
    return result;
};

const updateUserById = async (payload:User,userId:string)=> {
    const result = await prisma.user.update({
        where: {
            id:userId
        },
        data:payload
    });
    return result;
};

const deleteUserById = async (userId:string)=> {
    const result = await prisma.user.delete({
        where: {
            id:userId
        }
    });
    return result;
};



export const userService = {
    getUsers,
    getUserById,
    deleteUserById,
    updateUserById
}