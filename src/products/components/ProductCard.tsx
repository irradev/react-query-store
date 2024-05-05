import { Card, Image } from '@nextui-org/react';
import { type Product } from '..';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
  prefetchProduct?: (id: number) => void;
}

export const ProductCard = ({ product, prefetchProduct }: Props) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="flex"
      onMouseEnter={() => prefetchProduct?.(product.id)}
    >
      <Card className="relative flex-grow flex flex-col gap-3 md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div className="flex items-center flex-grow">
          <div className="w-full md:w-1/3 bg-white grid place-items-center">
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={400}
              className="rounded-xl p-5 sm:p-0 bg-white"
            />
          </div>
          <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
            <div className="flex justify-between item-center">
              <p className="text-gray-500 font-medium hidden md:block">
                {product.category}
              </p>
            </div>

            <h3 className="font-black text-gray-800 text-xl text-ellipsis overflow-hidden line-clamp-2">
              {product.title}
            </h3>
            <p className="text-2xl font-black text-gray-800">
              ${product.price}
              <span className="font-normal text-gray-600 text-base">
                {' '}
                +impuesto
              </span>
            </p>
          </div>
        </div>
        <p className=" text-gray-500 text-base text-ellipsis overflow-hidden line-clamp-4 ">
          {product.description}
        </p>
      </Card>
    </Link>
  );
};
