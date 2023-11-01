import styled from 'styled-components';

const ModalContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 400px;
background-color: rgba(255, 255, 255, 0.100);
max-width: 500px;
width: 450px;
padding: 50px 25px;
position: fixed;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
border-radius: 30px;
border: 1px solid #dadce0;
z-index: 2;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

function CenterModal({ children }) {
 return (
    <>
    <ModalBackground />
    <ModalContainer>
        {children}
    </ModalContainer>
    </>
 );
}

export default CenterModal;