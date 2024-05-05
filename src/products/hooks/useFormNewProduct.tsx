import { type Control, type UseFormSetValue, useWatch } from 'react-hook-form';
import { type FormInputs } from '../pages/NewProduct';
import { useCallback, useEffect } from 'react';

interface Props {
  control: Control<FormInputs>;
  setValue: UseFormSetValue<FormInputs>;
}
export const useFormNewProduct = ({ control, setValue }: Props) => {
  const title = useWatch({ control, name: 'title' });
  const price = useWatch({ control, name: 'price' });

  const makeExpensive = useCallback(() => {
    setValue('title', 'caro');
    setValue('price', 1000);
    setValue('description', 'Este producto es demasiado caro.');
    setValue('category', 'jewelery');
    setValue(
      'image',
      'https://th.bing.com/th/id/OIP.ULhntMpRM_C-Of9-ngiM3QAAAA?rs=1&pid=ImgDetMain'
    );
  }, [setValue]);

  const makeMini = useCallback(() => {
    setValue('title', 'mini');
    setValue('price', 530);
    setValue('description', 'Iphone 13 mini');
    setValue('category', 'electronics');
    setValue(
      'image',
      'https://th.bing.com/th/id/OIP.nOOqPJYHzaLbJ-z72Qc0ZQHaHa?rs=1&pid=ImgDetMain'
    );
  }, [setValue]);

  useEffect(() => {
    if (title === 'caro') {
      makeExpensive();
    } else if (title === 'mini') {
      makeMini();
    }
  }, [title, setValue, makeExpensive, makeMini]);

  useEffect(() => {
    if (+price === 1000) {
      makeExpensive();
    } else if (+price === 530) {
      makeMini();
    }
  }, [price, setValue, makeExpensive, makeMini]);

  return {};
};
