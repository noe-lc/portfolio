import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';

import useDidMount from '~/hooks/useDidMount';

import classes from './Modal.module.css';

type OnCloseEvent = React.MouseEvent<HTMLDivElement>;

interface IModal {
  open?: boolean;
  className?: string;
  onClose: (evt: OnCloseEvent) => void;
  closeOnBackdropClick?: boolean;
}

const Modal: React.FC<IModal> = ({
  children,
  open = false,
  className = '',
  closeOnBackdropClick,
  onClose,
}) => {
  const didMount = useDidMount();

  const [root] = useState(() => {
    const div = document.createElement('div');
    div.classList.add(classes.root, className || 'modal__root');
    return div;
  });

  function close(evt: OnCloseEvent) {
    console.log('clicked');
    evt.stopPropagation();

    if (
      (evt.target as HTMLDivElement).id.includes('dialog-backdrop') &&
      closeOnBackdropClick
    ) {
      onClose(evt);
      return;
    }

    onClose(evt);
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
      <div id="dialog-backdrop" className={classes.backdrop} onClick={close} />
      <div className={`${classes.container} ${className}`}>
        <div className={classes.wrapper} role="dialog">
          {children}
        </div>
      </div>
    </React.Fragment>,
    root
  );
};

export default Modal;
