import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { IProduct } from "../../../types/index";

export type ProductCardProps = {
  product: IProduct
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <div className="rounded w-64 text-main">
      <div className="relative">
        {/* <Link to={`/catalog/${product._id}`}> */}
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
        </Link>
        {isLiked ? (
          <IoIosHeart
            size={24}
            className="absolute top-2 right-2 text-pink cursor-pointer"
            onClick={() => {
              setIsLiked(false);
            }}
          />
        ) : (
          <IoIosHeartEmpty
            size={24}
            className="absolute top-2 right-2 text-pink cursor-pointer"
            onClick={() => {
              setIsLiked(true);
            }}
          />
        )}
      </div>
      <div className="mt-2">
        <Link to={`/product/${product._id}`} className="text-lg">
          {product.name}
        </Link>
        <p className="text-sm">{product.description}</p>
        <p className="font-semibold">{`${product.price} RSD`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
