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
    <ModalStyle role="dialog" onClick={() => close()}>
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button data-testid="close" className="close" onClick={() => close()}>
          x
        </button>
        <h3 className="title">Delete comment</h3>
        <p className="content">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone
        </p>
        <div className="buttons">
          <button className="btn btn-cancel" onClick={() => close()}>
            No, cancel
          </button>
          <button className="btn btn-delete">Yes, delete</button>
        </div>
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
  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    padding-bottom: 1rem;
  }
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    max-width: 380px;
    border-radius: 12px;
    .title {
      padding-bottom: 0.5rem;
      font-size: 1.3rem;
      font-weight: 700;
      color: hsl(0, 0%, 25%);
    }
    .content {
      padding-bottom: 0.2rem;
    }
    .btn {
      text-transform: uppercase;
      padding: 10px 1.7rem;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      font-weight: 700;
      margin-top: 1rem;
      &.btn-cancel {
        background-color: var(--clr-gray);
        color: var(--clr-white);
        &:hover {
          background-color: #e1e1e1;
          transition: all 0.3s ease-in-out;
        }
      }
      &.btn-delete {
        background-color: var(--clr-red);
        color: #fff;
        &:hover {
          background-color: #e60000;
          transition: all 0.3s ease-in-out;
        }
      }
    }
  }

  .close {
    color: var(--clr-white);
    background-color: var(--clr-white);
    border: none;
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
