import Select from 'react-select';
import { SymbolTypes } from '~/types/symbol';

import classes from './SymbologyMenu.module.css';

const OPTIONS = [
  { value: SymbolTypes.single, label: 'Single symbol' },
  { value: SymbolTypes.nominal, label: 'Categories' },
];

const SymbologyMenu: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <div>
        <Select
          instanceId="sm-001"
          // className={classes['classif-select']}
          classNamePrefix="prefix"
          options={OPTIONS}
        />
      </div>
    </div>
  );
};

export default SymbologyMenu;
