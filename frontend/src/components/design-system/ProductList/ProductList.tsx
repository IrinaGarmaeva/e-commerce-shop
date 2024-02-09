import { FC } from "react";
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../ProductCard/types';
import { ProductListProps } from "./types";


const ProductList: FC<ProductListProps> = ({products}) => {
  return (
    <section className='grid grid-cols-4 justify-items-center gap-4 max-lg:grid-cols-3' aria-label='Section with products'>
      {products.map((product: Product )=> (
        <ProductCard product={product} />
      ))}
    </section>
  )
}

export default ProductList
