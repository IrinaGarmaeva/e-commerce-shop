import { Request, Response } from "express-serve-static-core";
import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/productModel";
import { AuthenticatedRequest } from "../types";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  const product = await Product.findById(req.params.id);
  console.log('id of product', req.params.id)
  if (product) {
    return res.json(product);
  }
  res.status(404).json({ message: "Resourse not found" });
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const id = (req as AuthenticatedRequest).user._id;

  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: id,
    image: '/images/sample.jpg',
    description: 'Sample description',
    category: 'earrings',
    countInStock: 0,
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/admin
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  const {name, price, description, image, category, countInStock} = req.body;
  const product = await Product.findById(req.params.id);
  if(product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/admin
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  const product = await Product.findById(req.params.id);
  if(product) {
    await Product.deleteOne({_id:product._id})
    res.status(200).json({message: 'Product deleted'});
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});


export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
