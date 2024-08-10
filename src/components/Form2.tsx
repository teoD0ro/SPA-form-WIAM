import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setAddressData } from '../store/formsSlice';

type Inputs = {
  workplace: string
  address: string
}

type Form1Props = {
  categories: string[];
}

const Form2: React.FC<Form1Props> = ({ categories }) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const addressData = useAppSelector(state => state.forms.addressData)

  const {
    register,
    formState: {
      errors
    },
    handleSubmit,
  } = useForm<Inputs>({
    mode: 'onBlur',
    defaultValues: {
      workplace: addressData.workplace,
      address: addressData.address,
    }
  });
  console.log(addressData.workplace)


  const onSubmit = (data: any) => {
    dispatch(setAddressData(data));
    navigate('/form3');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label>Место работы</label>
        <select className="form-select"
          {...register('workplace', {
            required: 'Это поле обязательно к заполнению!'
          })}
        >
          <option value="">Выберите место работы</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {errors?.workplace && <p className="text-danger">{errors?.workplace?.message || 'Ошибка!'}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Выберите место работы</label>
        <input
          className="form-control"
          id="address"
          {...register('address', {
            required: 'Это поле обязательно к заполнению!'
          })}
        />
        {errors?.address && <p className="text-danger">{errors?.address?.message || 'Ошибка!'}</p>}
      </div>
      <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Назад</button>
      <button type="submit" className="btn btn-primary">Далее</button>
    </form>
  );
};

export default Form2;