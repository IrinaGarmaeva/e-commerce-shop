import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  countInStock: number;
}

const productSchema = new Schema<IProduct>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["earrings", "necklaces", "bracelets", "rings", "giftCertificates"],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
