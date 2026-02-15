import express, { Application } from 'express';
import cors from 'cors'
import medicineRouter from './modules/medicine/medicine.router';
import { CategoryRouter } from './modules/category/category.route';
import { ReviewRoutes } from './modules/review/review.router';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import { userRouter } from './modules/user/user.router';
import { orderRouter } from './modules/order/order.router';

const app: Application = express();

// Configure CORS to allow both production and Vercel preview deployments
const allowedOrigins = [
    process.env.APP_URL || "http://localhost:3000",
    process.env.PROD_APP_URL, // Production frontend URL
].filter(Boolean); // Remove undefined values


app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (mobile apps, Postman, etc.)
            if (!origin) return callback(null, true);

            // Check if origin is in allowedOrigins or matches Vercel preview pattern
            const isAllowed =
                allowedOrigins.includes(origin) ||
                /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
                /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

            if (isAllowed) {
                callback(null, true);
            } else {
                callback(new Error(`Origin ${origin} not allowed by CORS`));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
        exposedHeaders: ["Set-Cookie"],
    }),
);


// user authentication route from better auth
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

// root route
app.get("/", (req, res) => {
    res.send("Welcome to MediStore Backend!");
});

// medicine routes
app.use("/api/medicines", medicineRouter);

// categories route
app.use("/api/categories", CategoryRouter);

// reviews route
app.use("/api/review", ReviewRoutes)

// user route
app.use("/api/users", userRouter);

// order route
app.use("/api/orders", orderRouter);






export default app;
