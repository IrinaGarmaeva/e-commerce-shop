import {FC} from 'react';
import { IProduct } from "../../../types";

interface CustomNotificationProps {
  product: IProduct;
}

const CustomNotification: FC<CustomNotificationProps> = ({ product}) => (
  <div className='flex flex-col'>
    <h3 className='text-pink font-semibold pl-[82px]'>Added to Cart</h3>
    <div className="flex items-center pt-2">
    <img
      src={product.image}
      alt={product.name}
      className="w-20 h-16 object-cover "
    />
      <p className='pl-4'>{product.description}</p>
    </div>
  </div>
);

export default CustomNotification;
