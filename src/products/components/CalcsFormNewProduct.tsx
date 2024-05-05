import { type UseFormSetValue, type Control } from 'react-hook-form';
import { type FormInputs } from '../pages/NewProduct';
import { useFormNewProduct } from '../hooks/useFormNewProduct';

interface Props {
  control: Control<FormInputs>;
  setValue: UseFormSetValue<FormInputs>;
}
export const CalcsFormNewProduct = ({ control, setValue }: Props) => {
  // Lógica para actualizar valores de los inputs sin re-renderizar todo este componente
  useFormNewProduct({ control, setValue });

  console.count('CalcsFormNewProduct Component');
  return null;
};
