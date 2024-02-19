import express, {Request, Response, Express} from 'express';
import products from './data/products';

const port = 5000

const app: Express = express()

app.get("/", (req: Request, res: Response) => {
  res.send('Server is working')
})

app.get("/go", (req: Request, res: Response) => {
  res.send('GO PAGE IS WORKING!')
})

app.get("/api/products", (req: Request, res: Response) => {
  res.send(products)
})

app.get("/api/products/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p._id = req.params.id)
  res.send(product)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
