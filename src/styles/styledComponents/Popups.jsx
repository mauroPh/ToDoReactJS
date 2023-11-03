import styled from 'styled-components';

export const PopupSaveConfirmation = styled.div`
  position: absolute;
  bottom: 95px;
  right: 45px;
  background-color: #2fa73c;
  color: white;
  font-size: clamp(12px, 0.8vw, 1rem);
  border-radius: 12px;
  padding: 10px;
`;

export const PopupAlert = styled.div`
  width: 15vw;
  height: 5vh;
  position: absolute;
  bottom: 95px;
  right: 45px;
  background-color: #ac000d;
  color: white;
  font-size: clamp(10px, 0.8vw, 1rem);
  border-radius: 12px;
  padding: 10px;
  text-align: center;
`;

export const ButtonClosePopup = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  bottom: 60px;
  right: 0px;
`;