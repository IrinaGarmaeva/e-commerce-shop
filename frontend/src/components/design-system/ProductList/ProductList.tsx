import { FC } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { IProduct } from "../../../types/index";

type ProductListProps = {
  products: Array<IProduct>
}

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <section
      className="mt-8 flex flex-row flex-wrap justify-center justify-items-center gap-5"
      aria-label="Section with products"
    >
      {products.map((product: IProduct) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </section>
  );
};

export default ProductList;
