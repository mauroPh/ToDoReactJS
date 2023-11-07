import styled from 'styled-components';

export const PopupSaveConfirmation = styled.div`
  position: absolute;
  bottom: 95px;
  right: 45px;
  background: linear-gradient(to top, #28a634, #2fa73c, #34b844);
  color: white;
  font-size: clamp(10px, 0.8vw, 1rem);
  border-radius: 12px;
  padding: 10px;
  z-index: 1000;
`;

export const PopupAlert = styled.div`
 
  position: absolute;
  bottom: 95px;
  right: 45px;
  background: linear-gradient(to top,#e60012, #ac000d, #d10011);
  color: white;
  font-size: clamp(10px, 0.8vw, 1rem);
  border-radius: 12px;
  padding: 10px;
  text-align: center;
  z-index: 1000;
`;

export const ButtonClosePopup = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  bottom: 60px;
  right: 0px;
`;