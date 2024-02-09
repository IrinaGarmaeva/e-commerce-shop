import products from '../../../products';
import ProductList from '../../design-system/ProductList/ProductList';

const Home = () => {
  return (
    <section className='max-container padding pt-10'>
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
