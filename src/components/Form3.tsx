import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setLoanData } from '../store/formsSlice';

type Inputs = {
  loanAmount: number
  loanTerm: number
}

const Form3: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loanData = useAppSelector(state => state.forms.loanData)
  const personalData = useAppSelector(state => state.forms.personalData)

  const {
    register,
    watch,
    handleSubmit,
  } = useForm<Inputs>({
    mode: 'onBlur',
    defaultValues: {
      loanAmount: loanData.loanAmount,
      loanTerm: loanData.loanTerm,
    }
  });

  const onSubmit = async (data: any) => {
    dispatch(setLoanData(data));
    const res = { title: `${personalData.name} ${personalData.surname}` };

    try {
      await axios.post('https://dummyjson.com/products/add', res)
      setShowModal(true);
    } catch (error) {
      console.error("Error submitting loan request", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="loanAmount" className="form-label">Сумма займа ($)</label>
          <input
            type='range'
            min={200}
            max={1000}
            step={100}
            className="form-control"
            id="loanAmount"
            {...register('loanAmount', {
              required: 'Это поле обязательно к заполнению!'
            })}
          />
          <span>{watch("loanAmount")}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="loanTerm" className="form-label">Срок займа (дни)</label>
          <input
            type='range'
            min={10}
            max={30}
            step={1}
            className="form-control"
            id="loanTerm"
            {...register('loanTerm', {
              required: 'Это поле обязательно к заполнению!'
            })}
          />
          <span>{watch("loanTerm")}</span>
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/form2')}>Назад</button>
        <button type="submit" className="btn btn-primary">Подать заявку</button>
      </form>

      {showModal && (
        <ConfirmationModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Form3;