import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { InputMask } from '@react-input/mask';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setPersonalData } from '../store/formsSlice';

type Inputs = {
  tel: string
  name: string
  surname: string
  gender: string
}

const Form1: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const personalData = useAppSelector(state => state.forms.personalData)

  const {
    register,
    formState: {
      errors
    },
    handleSubmit,
    control
  } = useForm<Inputs>({
    mode: 'onBlur',
    defaultValues: {
      tel: personalData.tel,
      name: personalData.name,
      surname: personalData.surname,
      gender: personalData.gender,
    }
  });

  const onSubmit = (data: any) => {
    dispatch(setPersonalData(data));
    navigate('/form2');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="mb-3">
        <label htmlFor="tel" className="form-label">Телефон</label>
        <Controller
          render={({ field: { onChange, onBlur, value } }) => (
            <InputMask
              className="form-control"
              mask="0XXX XXX XXX"
              replacement={{ X: /\d/ }}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          control={control}
          rules={{
            required: 'Это поле обязательно к заполнению!',
            minLength: {
              value: 12,
              message: "Заполните номер полностью"
            }
          }}
          name="tel"
        />
        {errors?.tel && <p className="text-danger">{errors?.tel?.message || 'Ошибка!'}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Имя</label>
        <input
          className="form-control"
          id="name"
          {...register('name', {
            required: 'Это поле обязательно к заполнению!'
          })}
        />
        {errors?.name && <p className="text-danger">{errors?.name?.message || 'Ошибка!'}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="surname" className="form-label">Фамилия</label>
        <input
          className="form-control"
          id="surname"
          {...register('surname', {
            required: 'Это поле обязательно к заполнению!'
          })}
        />
        {errors?.surname && <p className="text-danger">{errors?.surname?.message || 'Ошибка!'}</p>}
      </div>
      <div className="mb-3">
        <label>Пол</label>
        <select className="form-select"
          {...register('gender', {
            required: 'Это поле обязательно к заполнению!'
          })}
        >
          <option value="">Выберите пол</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
        {errors?.gender && <p className="text-danger">{errors?.gender?.message || 'Ошибка!'}</p>}
      </div>
      <button className="btn btn-primary" type="submit">Далее</button>
    </form>
  );
};

export default Form1;