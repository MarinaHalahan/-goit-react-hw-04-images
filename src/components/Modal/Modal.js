import React, { useEffect } from 'react';
import { Backdrop, ModalWrapp } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ children, onClick }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  return (
    <Backdrop onClick={onClick}>
      <ModalWrapp>
        <img src={children} alt="" />
      </ModalWrapp>
    </Backdrop>
  );
};

Modal.propTypes = {
  onClick: PropTypes.func,
};
