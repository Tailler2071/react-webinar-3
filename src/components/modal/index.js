import React from 'react';
import PropTypes from "prop-types";
import { createPortal } from 'react-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const Modal = ({title, show, onCloseButtonClick, children }) => {
  const cn = bem('Modal');

  if (!show) {
    return null;
  }

  return createPortal(
    <div className={cn()}>
      <div className={cn('view')}>
        <div className={cn('header')}>
          <p className={cn('header-title')}>{title}</p>
          <button onClick={onCloseButtonClick}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
