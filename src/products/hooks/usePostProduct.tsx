import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productActions } from '..';
import { type Product } from '../interfaces/product.interface';

export const usePostProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,

    //data is the response of the server, in this case the new product created

    onMutate: (data) => {
      console.log('Mutando - Optimistic update');

      // Optimistic product
      const optimisticProduct = {
        ...data,
        id: Math.random(),
      };

      // Almacenar el producto en el cache del query client
      queryClient.setQueryData<Product[]>(
        ['products', { filterkey: data.category }],
        (old) => [...(old || []), optimisticProduct]
        // (old) => {
        //   if (!old) return [optimisticProduct];

        //   return [...old, optimisticProduct];
        // }
      );

      // al retornar lo toma el context de onSuccess,
      // podemos retornar objetos, etc.
      return optimisticProduct;
    },

    onSuccess: (data, _variables, context) => {
      // console.log('product created');
      // queryClient.invalidateQueries({
      //   queryKey: ['products', { filterkey: data.category }],
      // });

      queryClient.removeQueries({
        queryKey: ['product', context?.id],
      });

      queryClient.setQueryData<Product[]>(
        ['products', { filterkey: data.category }],
        // (old) => [...(old || []), data]
        (old) => {
          if (!old) return [data];

          return old.map((product) => {
            if (product.id === context?.id) {
              return data;
            }
            return product;
          });
        }
      );
    },
    onError: (error, variables, context) => {
      // console.log(error);
      console.log(error.message);

      queryClient.removeQueries({
        queryKey: ['product', context?.id],
      });

      queryClient.setQueryData<Product[]>(
        ['products', { filterkey: variables.category }],
        // (old) => [...(old || []), data]
        (old) => {
          if (!old) return [];

          return old.filter((product) => product.id !== context?.id);
        }
      );
    },
    onSettled: () => {
      console.log('onSettled');
    },
  });

  return mutation;
};
