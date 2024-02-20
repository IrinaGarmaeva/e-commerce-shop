import express, {Request, Response, Express} from 'express';
import connectDB from './config/db';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import products from './data/products';

const port = process.env.PORT || 5000;

const app: Express = express();
connectDB();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send('Server is working')
})

app.get("/go", (req: Request, res: Response) => {
  res.send('GO PAGE IS WORKING!')
})

app.get("/api/products", (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  res.json(products)
})

app.get("/api/products/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
