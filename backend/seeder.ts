import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from 'colors';
import users from "./data/users";
import products from "./data/products";
import User from './models/userModel';
import Product from "./models/productModel";
import Order from "./models/orderModel";
import connectDB from "./config/db";


dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users)
    const adminUserId = createdUsers[0]._id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUserId}
    })

    await Product.insertMany(sampleProducts)
    console.log('Data imported'.green.inverse)
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyes'.red.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

if(process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
