import { Button, Image, Input, Textarea } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { CheckIfFormRender } from '../components/CheckIfFormRender';
import { CalcsFormNewProduct } from '../components/CalcsFormNewProduct';

import { usePostProduct } from '..';

export interface FormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const NewProduct = () => {
  const productMutation = usePostProduct();

  const { control, handleSubmit, setValue, watch } = useForm<FormInputs>({
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      category: 'mens clothing',
      image: '',
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    productMutation.mutate(data);
  };

  const newImage = watch('image');

  return (
    <div className="w-full flex-col">
      <CalcsFormNewProduct
        control={control}
        setValue={setValue}
      />
      <CheckIfFormRender />
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form
        className="w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-around items-center">
          <div className="flex-col w-[500px]">
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  type="text"
                  label="Titulo del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value?.toString()}
                  onChange={(ev) => field.onChange(+ev.target.value)}
                  className="mt-2"
                  type="number"
                  label="Precio del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  type="url"
                  label="Url de la imagen delproducto"
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  label="Descripcion del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className="rounded-md p-3 mt-2 bg-gray-800 w-full"
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <br />
            <Button
              type="submit"
              className="mt-2"
              color="primary"
              isDisabled={productMutation.isPending}
            >
              {productMutation.isPending ? 'Guardando...' : 'Crear producto'}
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center"
            style={{
              width: '500px',
              height: '600px',
            }}
          >
            <Image src={newImage} />
          </div>
        </div>
      </form>
    </div>
  );
};
