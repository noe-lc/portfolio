import Select from 'react-select';

import classes from './SymbologyMenu.module.css';

const SymbologyMenu: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <h4>Layer Nameaa</h4>
      <div>
        <Select
          instanceId="sm-001"
          // className={classes['classif-select']}
          classNamePrefix="prefix"
        />
      </div>
    </div>
  );
};

export default SymbologyMenu;
