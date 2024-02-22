import ProductList from '../../design-system/ProductList/ProductList';
import { useGetProductsQuery } from '../../../redux/slices/apiSlices/productsSlice/productsSlice';
import Loader from '../../design-system/Loader/Loader';

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery('');

  return (
    <section className='max-container padding py-10'>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>
          There is an error
          {/* {error?.data?.message || error.error} */}
        </div>
      ) : (
        <>
          <h1 className='text-center'>Latest Products</h1>
          <ProductList products={products} />
          {/* <div className='grid grid-cols-4 justify-items-center gap-4 max-lg:grid-cols-3'>
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </div> */}
        </>
      )}
    </section>
  );
};

export default Home;

