import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';

import useDidMount from '~/hooks/useDidMount';

import classes from './Modal.module.css';

type OnCloseEvent = React.MouseEvent<HTMLDivElement>;

interface IModal {
  open?: boolean;
  className?: string;
  onClose?: (evt: OnCloseEvent) => void;
  closeOnBackdropClick?: boolean;
}

const Modal: React.FC<IModal> = ({
  children,
  open = false,
  className = '',
  closeOnBackdropClick,
  onClose,
}) => {
  const backdropClick = useRef(false);
  const didMount = useDidMount();

  const [root] = useState(() => {
    const div = document.createElement('div');

    div.classList.add(classes.root, className || 'modal__root');
    div.addEventListener('click', evt => close(evt as unknown as OnCloseEvent));

    return div;
  });

  function close(evt: OnCloseEvent) {
    evt.stopPropagation();

    if (!backdropClick.current) {
      return;
    }

    backdropClick.current = false;

    if (closeOnBackdropClick && onClose) {
      onClose(evt);
      return;
    }
  }

  function handleMouseDown(evt: OnCloseEvent) {
    console.log('evt :>> ', evt);
    backdropClick.current = evt.target === evt.currentTarget;
  }

  function handleWrapperMouseDown(evt: OnCloseEvent) {
    evt.stopPropagation();
  }

  useEffect(() => {
    if (didMount && !open) root.remove();

    if (didMount && open) {
      document.querySelector('body').appendChild(root);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return ReactDOM.createPortal(
    <React.Fragment>
      <div className={classes.backdrop} />
      <div
        className={`${classes.container} ${className}`}
        onMouseDown={handleMouseDown}
      >
        <div
          className={classes.wrapper}
          role="dialog"
          onMouseDown={handleWrapperMouseDown}
        >
          {children}
        </div>
      </div>
    </React.Fragment>,
    root
  );
};

export default Modal;
