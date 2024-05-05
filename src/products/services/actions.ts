import { productsApi } from '../api/products-api';
import { ProductPost, type Product } from '../interfaces/product.interface';

export const sleep = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, s * 1000));
interface GetProductsOptions {
  filterkey?: string;
}

export const getProducs = async ({
  filterkey,
}: GetProductsOptions): Promise<Product[]> => {
  const filterURL = filterkey ? `?category=${filterkey}` : '';

  const { data } = await productsApi.get<Product[]>(`/products${filterURL}`);

  return data;
};
export const getProducById = async (id: number): Promise<Product> => {
  const { data } = await productsApi.get<Product>(`/products/${id}`);

  return data;
};

export const createProduct = async (product: ProductPost): Promise<Product> => {
  await sleep(5);

  throw new Error('Error creating product');

  const { data } = await productsApi.post<Product>('/products', product);

  return data;
};
