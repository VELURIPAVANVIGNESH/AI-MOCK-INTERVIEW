import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import feedbackRoutes from './Routes/feedback.route.js';
import workRoutes from './Routes/workRole.route.js';
import path from 'path';


dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}))

app.use("/interview", feedbackRoutes);
app.use("/work",workRoutes);


if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*" , (req,res) => {
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    })
}

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    connectDB(); 
    console.log(`Server started at PORT ${PORT}`);
});
