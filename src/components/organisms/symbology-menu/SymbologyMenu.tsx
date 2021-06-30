import { useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import MapLayerStore from '~/stores/mapLayer';
import LayerSymbolRouter from '~/components/atoms/layer-symbol/LayerSymbolRouter';
import { SymbolTypes } from '~/types/symbol';
import { ValuesOf } from '~/types/common';

import classes from './SymbologyMenu.module.css';

interface ISymbologyMenu {
  mapLayerStore: MapLayerStore;
  className?: string;
}

const OPTIONS = [
  { value: SymbolTypes.single, label: 'Single symbol' },
  { value: SymbolTypes.classified, label: 'Categories' },
  { value: SymbolTypes.ruleBased, label: 'Rule based' },
];

const getOption = (value: SymbolTypes): ValuesOf<typeof OPTIONS> => {
  return OPTIONS.find(option => option.value === value);
};

const SymbologyMenu: React.FC<ISymbologyMenu> = ({ mapLayerStore }) => {
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [internalSymbologyType, setInternalSymbologyType] = useState(() =>
    getOption(mapLayerStore.symbol.definition.type)
  );

  function handleChange(option: OptionTypeBase) {
    setInternalSymbologyType(getOption(option.value));
  }

  return (
    <div className={classes.wrapper}>
      <Select
        instanceId="sm-001"
        classNamePrefix="prefix"
        options={OPTIONS}
        value={internalSymbologyType}
        onChange={handleChange}
      />
      {/*<Modal open={isColorOpen}>

        </Modal>*/}
      <div className={classes.previewncontrols}>
        <div className={classes['preview-container']}>
          <h5 className={classes['preview-title']}>Preview</h5>
          <LayerSymbolRouter
            symbolDefinition={mapLayerStore.symbol.definition}
          />
        </div>
      </div>
    </div>
  );
};

export default SymbologyMenu;
