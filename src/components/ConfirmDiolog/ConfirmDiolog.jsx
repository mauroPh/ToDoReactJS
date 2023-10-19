import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

const Dialog = ({ title, message, onConfirm, onCancel }) => (
    <div className="dialog">
        <div className="dialog__content">
        <div className="dialog__title">{title}</div>
        <div className="dialog__message">{message}</div>
        <div className="dialog__actions">
            <button className="dialog__button" onClick={onCancel}>
                <Icon path={mdiClose} size={1} /> Cancelar
            </button>
            <button className="dialog__button" onClick={onConfirm}>
                <Icon path={mdiClose} size={1} /> Deletar
            </button>
        </div>
        </div>
    </div>
    );

Dialog.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const AlertDialog = () => {
    const handleConfirm = () => {
        console.log('Conta deletada');
    };
    const handleCancel = () => {
        console.log('Cancelado');

        const dialog = document.querySelector('.dialog');
        dialog.parentNode.removeChild(dialog);
    };
    return (
        alert('Tem certeza que deseja deletar sua conta?')
        // <Dialog
        //     title="Deletar Conta"
        //     message="Tem certeza que deseja deletar sua conta?"
        //     onConfirm={handleConfirm}
        //     onCancel={handleCancel}
        // />
    );
};

export default AlertDialog;