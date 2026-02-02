import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from '../lib/auth';


export enum UserRole {
    CUSTOMER = "CUSTOMER",
    SELLER = "SELLER",
    ADMIN = "ADMIN",
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                role: string;
                emailVerified: boolean;
            }
        }
    }
}


const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const seassion = await betterAuth.api.getSession({
                headers: req.headers,
            })
            // if seassion data not found
            if (!seassion) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized"
                })
            }

            req.user = {
                id: seassion.user.id,
                email: seassion.user.email,
                name: seassion.user.name,
                role: seassion.user.role as string,
                emailVerified: seassion.user.emailVerified
            };



            if (roles.length && !roles.includes(req.user.role as UserRole)) {
                return res.status(401).json({
                    success: false,
                    message: "Forbidden access! You don't have permisson to access this resourches..!"
                })
            }


            next();
        } catch (error) {
            next(error);
        }
    }
}

export default auth;
