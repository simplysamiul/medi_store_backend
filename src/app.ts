import express, { Application } from 'express';
import cors from 'cors'
import medicineRouter from './modules/medicine/medicine.router';
import { CategoryRouter } from './modules/category/category.route';
import { ReviewRoutes } from './modules/review/review.router';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import { userRouter } from './modules/user/user.router';

const app: Application = express();

app.use(cors({
    origin: process.env.CLIENT_URL ||"http://localhost:3000",
    credentials: true,
}));

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
app.use("/api/users", userRouter)






export default app;
