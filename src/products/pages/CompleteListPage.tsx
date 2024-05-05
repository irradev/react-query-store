import { ProductList, useProducts } from '..';

export const CompleteListPage = () => {
  const { productsQuery } = useProducts({});

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Todos los productos</h1>

      {productsQuery.isLoading && <p>Loading...</p>}

      <ProductList products={productsQuery.data || []} />
    </div>
  );
};
