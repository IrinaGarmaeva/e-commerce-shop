
export interface ProductType {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export type ProductCardProps = {
  product: ProductType
}
