import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';

import useDidMount from '~/hooks/useDidMount';

import classes from './Modal.module.css';

interface IModal {
  open?: boolean;
  className?: string;
}

const Modal: React.FC<IModal> = ({
  children,
  open = false,
  className = '',
}) => {
  const didMount = useDidMount();

  const [root] = useState(() => {
    const div = document.createElement('div');
    div.classList.add(classes.root, className || 'modal__root');
    return div;
  });

  useEffect(() => {
    if (didMount && !open) root.remove();

    if (didMount && open) {
      document.querySelector('body').appendChild(root);
      console.log('passed');
    }

    return () => root.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return ReactDOM.createPortal(
    <React.Fragment>
      <div className={classes.backdrop} />
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
