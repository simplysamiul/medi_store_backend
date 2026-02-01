import express, { Application } from 'express';
import cors from 'cors'
import medicineRouter from './modules/medicine/medicine.router';
import { CategoryRouter } from './modules/category/category.route';

const app: Application = express();

app.use(cors());
app.use(express.json());

// root route
app.get("/", (req, res) => {
    res.send("Welcome to MediStore Backend!");
});

// medicine routes
app.use("/api/medicines", medicineRouter);

// categories route
app.use("/api/categories", CategoryRouter)





export default app;
