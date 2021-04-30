import { useState } from 'react';
import Select from 'react-select';
import Modal from '~/components/atoms/modal';

import { SymbolTypes } from '~/types/symbol';

import classes from './SymbologyMenu.module.css';

const OPTIONS = [
  { value: SymbolTypes.single, label: 'Single symbol' },
  { value: SymbolTypes.classified, label: 'Categories' },
  { value: SymbolTypes.ruleBased, label: 'Rule based' },
];

const SymbologyMenu: React.FC = () => {
  const [isColorOpen, setIsColorOpen] = useState(false);

  return (
    <div className={classes.wrapper}>
      <Select instanceId="sm-001" classNamePrefix="prefix" options={OPTIONS} />
      {/*<Modal open={isColorOpen}>

        </Modal>*/}
      <h5>Preview</h5>
      <div className={classes.previewncontrols}>
        <div className={classes['preview-container']}>
          <div className={classes.preview} />
        </div>
      </div>
    </div>
  );
};

export default SymbologyMenu;
