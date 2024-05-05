import { useQuery } from '@tanstack/react-query';
import { productActions } from '..';

interface Options {
  id: number;
}

export const useProduct = ({ id }: Options) => {
  const productQuery = useQuery({
    queryKey: ['product', id],
    queryFn: () => productActions.getProducById(id),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    productQuery,
  };
};
