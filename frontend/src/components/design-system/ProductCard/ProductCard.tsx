import { FC } from "react";
import { Link } from "react-router-dom";
import { ProductCardProps } from "./types";

const ProductCard:FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="rounded w-64 text-main">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover"/>
      </Link>
      <div className="mt-2">
        <Link to={`/product/${product._id}`} className="text-lg">{product.name}</Link>
        <p className="text-sm">{product.description}</p>
        <p className="font-semibold">{`${product.price} RSD`}</p>
      </div>
    </div>
  )
}

export default ProductCard
