import { useQuery } from '@tanstack/react-query';
import { productActions } from '..';

interface Options {
  filterkey?: string;
}

export const useProducts = ({ filterkey }: Options) => {
  const productsQuery = useQuery({
    queryKey: ['products', { filterkey }],
    queryFn: () => productActions.getProducs({ filterkey }),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    productsQuery,
  };
};
