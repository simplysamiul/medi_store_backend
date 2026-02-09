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



export const userService = {
    getUsers,
    getUserById
}