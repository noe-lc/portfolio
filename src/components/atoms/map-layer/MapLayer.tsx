import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { GrDown } from 'react-icons/gr';

import MapLayerStore from '~/stores/mapLayer';
import LayerSymbol from '../layer-symbol';
import { SymbolTypes } from '~/types/symbol';

import useClasses from '~/hooks/useModuleClasses';

import classes from './MapLayer.module.css';

interface IMapLayer {
  store: MapLayerStore;
}

const MapLayer: React.FC<IMapLayer> = ({ store }) => {
  const joinClasses = useClasses(classes);

  const [showSymbol, setShowSymbol] = useState(false);

  const hasSingleSymbol = store.symbol.definition.type === SymbolTypes.single;

  function toggleShowSymbol() {
    setShowSymbol(!showSymbol);
  }

  if (hasSingleSymbol) {
    return (
      <div className={classes.container}>
        <div className={joinClasses('control control-visibility')}>
          <input
            checked={store.visible}
            type="checkbox"
            onChange={store.toggleVisibility}
          />
        </div>
        <div className={classes['control--single']}>
          <LayerSymbol store={store.symbol} />
          <span>{store.name || store.id}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={joinClasses('control control-visibility')}>
        <GrDown
          className={joinClasses(
            `collapse ${showSymbol ? 'collapse--expanded' : ''}`
          )}
          onClick={toggleShowSymbol}
        />
        <input
          checked={store.visible}
          type="checkbox"
          onChange={store.toggleVisibility}
        />
      </div>
      <div className={classes.control}>
        <span className={classes['layer-name']}>{store.name || store.id}</span>
        {showSymbol && (
          <div className={classes.symbol}>
            <LayerSymbol store={store.symbol} />
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(MapLayer);
