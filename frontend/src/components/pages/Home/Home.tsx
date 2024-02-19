import { useState, useEffect } from 'react';
import ProductList from '../../design-system/ProductList/ProductList';
import {ProductType} from '../../design-system/ProductCard/types';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState<Array<ProductType>>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const {data} = await axios.get('http://localhost:5000/api/products')
      setProducts(data);
    };

    fetchProducts()
  }, [])

  return (
    <section className='max-container padding py-10'>
      <h1 className='text-center'>Latest Products</h1>
      <ProductList products={products} />
      {/* <div className='grid grid-cols-4 justify-items-center gap-4 max-lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div> */}
    </section>
  )
}

export default Home
