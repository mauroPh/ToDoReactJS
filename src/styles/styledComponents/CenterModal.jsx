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
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 30px;
    border: 1px solid #dadce0;
`;

function CenterModal({ children, onClose }) {
    return (
      <ModalContainer>
        <button onClick={onClose}>Fechar</button>
        {children}
      </ModalContainer>
    );
}

export default CenterModal;