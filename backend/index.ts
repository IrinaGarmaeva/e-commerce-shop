import express, { Request, Response, Express } from "express";
import connectDB from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routes/productRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

const port = process.env.PORT || 5000;

const app: Express = express();
connectDB();

app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.send("Server is working");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
