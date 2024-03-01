import express, { Request, Response, Express } from "express";
import connectDB from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from 'cookie-parser';
import productRoutes from "./routes/productRoutes";
import userRoutes from './routes/userRoutes'
import { notFound, errorHandler } from "./middleware/errorMiddleware";

const port = process.env.PORT || 5000;

connectDB();

const app: Express = express();
// app.use(cors());
// app.use(cors({origin: "http://localhost:5173", credentials: true}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  res.send("Server is working");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
