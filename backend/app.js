import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser' // Spelling fixed
import errorHandler from './src/middlewere/errorhandler.middlewere.js';
import userRouter from './src/routes/user.routes.js';
import noteRouter from './src/routes/notes.routes.js';
const app = express();

// --- 1. CORS CONFIGURATION (CRITICAL FIX) ---
app.use(cors({
  
    origin: ["http://localhost:5173","http://localhost:5174","https://notes-app-ten-eosin.vercel.app],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" })); 
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);
app.use(errorHandler);
export default app;
