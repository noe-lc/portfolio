import React, { useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import MapLayerStore from '~/stores/mapLayer';
import PolygonSymbologyMenu from './PolygonSymbologyMenu';
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

const SymbologyMenu: React.FC<ISymbologyMenu> = ({
  mapLayerStore,
  className = '',
}) => {
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [internalSymbologyType, setInternalSymbologyType] = useState(() =>
    getOption(mapLayerStore.symbol.definition.type)
  );

  function handleChange(option: OptionTypeBase) {
    setInternalSymbologyType(getOption(option.value));
  }

  function renderMenuContent() {
    switch (mapLayerStore.geometryType) {
      case 'Point':
        return 'point menu';
      case 'LineString':
        return 'linestring menu';
      case 'Polygon':
      case 'MultiPolygon':
        return <PolygonSymbologyMenu mapLayerStore={mapLayerStore} />;
      default:
        return 'default menu';
    }
  }

  return (
    <div className={`classes.wrapper ${className}`}>
      <Select
        instanceId="sm-001"
        classNamePrefix="prefix"
        options={OPTIONS}
        value={internalSymbologyType}
        onChange={handleChange}
      />
      {renderMenuContent()}
    </div>
  );
};

export default SymbologyMenu;
