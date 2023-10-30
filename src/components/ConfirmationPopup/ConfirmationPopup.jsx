import React from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  max-width: 500px;
  width: 450px;
  padding: 50px 25px;
  position: relative;
  border-radius: 30px;
  border: 1px solid #dadce0;
`;

const Question = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;

const CancelButton = styled.button`
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 30px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
background-color: rgba(230, 0, 10);
color: #fff;
  border-radius: 30px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const ConfirmationPopup = ({ question, onConfirm, onCancel }) => {
  return (
    <PopupContainer>
      <PopupContent>
        <Question>{question}</Question>
        <ButtonContainer>
        <CancelButton onClick={onCancel}>Voltar</CancelButton>
          <ConfirmButton onClick={onConfirm}>Confirmar</ConfirmButton>
        </ButtonContainer>
      </PopupContent>
    </PopupContainer>
  );
};

export default ConfirmationPopup;