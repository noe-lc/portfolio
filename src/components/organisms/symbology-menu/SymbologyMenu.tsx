import { useState } from 'react';
import Select from 'react-select';

import MapLayerStore from '~/stores/mapLayer';
import SymbolPreview from '~/components/atoms/symbol-preview';
import { SymbolTypes } from '~/types/symbol';

import classes from './SymbologyMenu.module.css';

interface ISymbologyMenu {
  mapLayerStore: MapLayerStore
}

const OPTIONS = [
  { value: SymbolTypes.single, label: 'Single symbol' },
  { value: SymbolTypes.classified, label: 'Categories' },
  { value: SymbolTypes.ruleBased, label: 'Rule based' },
];

const SymbologyMenu: React.FC<ISymbologyMenu> = ({ mapLayerStore }) => {
  const [isColorOpen, setIsColorOpen] = useState(false);

  return (
    <div className={classes.wrapper}>
      <Select instanceId="sm-001" classNamePrefix="prefix" options={OPTIONS} />
      {/*<Modal open={isColorOpen}>

        </Modal>*/}
      <h5>Preview</h5>
      <div className={classes.previewncontrols}>
        <div className={classes['preview-container']}>
        <SymbolPreview mapLayerStore={mapLayerStore}/>
        </div>
      </div>
    </div>
  );
};

export default SymbologyMenu;
