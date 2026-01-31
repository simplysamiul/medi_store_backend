import express, { Application } from 'express';
import cors from 'cors'

const app: Application = express();

app.use(cors());
app.use(express.json());

// root route
app.get("/", (req, res) => {
    res.send("Welcome to MediStore Backend!");
});





export default app;
