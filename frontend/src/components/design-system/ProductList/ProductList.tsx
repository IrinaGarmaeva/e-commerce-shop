import { FC } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { IProduct } from "../../../types/index";

type ProductListProps = {
  products: Array<IProduct>;
};

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <section
      className="mt-8 flex justify-center"
      aria-label="Section with products"
    >
      <div className="grid grid-cols-4 gap-8 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {products.map((product: IProduct) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
