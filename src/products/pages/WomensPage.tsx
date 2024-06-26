import { ProductList, useProducts } from '..';

export const WomensPage = () => {
  const { productsQuery } = useProducts({ filterkey: "women's clothing" });
  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para mujeres</h1>

      {productsQuery.isLoading && <p>Loading...</p>}

      <ProductList products={productsQuery.data || []} />
    </div>
  );
};
