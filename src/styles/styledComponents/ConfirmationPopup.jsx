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
  z-index: 1000;
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
  text-align: center;
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
  border: none;
  box-shadow: 0 2px 4px rgba(3, 73, 251, 0.641);
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const ConfirmButton = styled.button`
  background-color: rgba(230, 0, 10);
  box-shadow: 0 2px 4px rgba(3, 73, 251, 0.641);
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover{
  background-color: #8a0c0c;
  }`;

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