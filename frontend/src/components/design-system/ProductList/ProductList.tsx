import { FC } from "react";
import ProductCard from '../ProductCard/ProductCard';
import { ProductType } from '../ProductCard/types';
import { ProductListProps } from "./types";


const ProductList: FC<ProductListProps> = ({products}) => {
  return (
    <section className='mt-8 flex flex-row flex-wrap justify-center justify-items-center gap-5' aria-label='Section with products'>
      {products.map((product: ProductType )=> (
        <ProductCard product={product} key={product._id}/>
      ))}
    </section>
  )
}

export default ProductList
