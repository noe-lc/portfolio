import React, { useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { GrDown } from 'react-icons/gr';

import MapLayerStore from '~/stores/mapLayer';
import LayerSymbol from '../layer-symbol';
import LayerSymbolStore from '~/stores/layerSymbol';
import useClasses from '~/hooks/useModuleClasses';

import classes from './MapLayer.module.css';

interface IMapLayer {
  store: MapLayerStore;
}

const MapLayer: React.FC<IMapLayer> = ({ store }) => {
  const joinClasses = useClasses(classes);

  const [showSymbol, setShowSymbol] = useState(false);
  const symbolStore = useLocalObservable(() => new LayerSymbolStore(store));

  function toggleShowSymbol() {
    setShowSymbol(!showSymbol);
  }

  return (
    <div className={classes.container}>
      <div className={joinClasses('control control-visibility')}>
        <GrDown
          className={joinClasses(
            `collapse-symbol ${showSymbol ? 'collapse-symbol--expanded' : ''}`
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
        {showSymbol && <LayerSymbol store={symbolStore} />}
      </div>
    </div>
  );
};

export default observer(MapLayer);
