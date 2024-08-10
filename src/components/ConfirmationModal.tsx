import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';


interface ConfirmationModalProps {
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onClose }) => {
  const loanData = useAppSelector(state => state.forms.loanData)
  const personalData = useAppSelector(state => state.forms.personalData)
  const navigate = useNavigate();

  const close = () => {
    navigate('/');
  };


  return (
    <Modal show={true} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Подтверждение заявки</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`Поздравляем, ${personalData.surname} ${personalData.name}. Вам одобрена ${loanData.loanAmount}$ на ${loanData.loanTerm} дней.`}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;