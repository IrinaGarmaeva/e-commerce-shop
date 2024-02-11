import { FC } from "react";
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../ProductCard/types';
import { ProductListProps } from "./types";


const ProductList: FC<ProductListProps> = ({products}) => {
  return (
    // <section className='grid grid-cols-4 justify-items-center gap-4 max-lg:grid-cols-3' aria-label='Section with products'>
    <section className='mt-8 flex flex-row flex-wrap justify-center justify-items-center gap-5' aria-label='Section with products'>
      {products.map((product: Product )=> (
        <ProductCard product={product} key={product._id}/>
      ))}
    </section>
  )
}

export default ProductList
