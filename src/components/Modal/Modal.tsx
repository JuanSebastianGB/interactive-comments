import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
export interface ModalProps {
  close: () => void;
}

const Modal: React.FC<ModalProps> = ({ close }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;
  return createPortal(
    <ModalStyle role="dialog">
      <div className="modal">
        <button data-testid="close" className="close" onClick={() => close()}>
          x
        </button>
        <span>Delete component</span>
        <button onClick={() => close()}>No, cancel</button>
        <button>Yes, delete</button>
      </div>
    </ModalStyle>,
    modalRoot
  );
};

export const ModalStyle = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  .modal {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export default Modal;
