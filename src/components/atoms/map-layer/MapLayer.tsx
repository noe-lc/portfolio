import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { GrDown } from 'react-icons/gr';

import MapLayerStore from '~/stores/mapLayer';
import useModuleClasses from '~/hooks/useModuleClasses';

import classes from './MapLayer.module.css';

interface IMapLayer {
  store: MapLayerStore;
}

const MapLayer: React.FC<IMapLayer> = ({ store }) => {
  const joinClasses = useModuleClasses(classes);

  const [showSymbol, setShowSymbol] = useState(false);

  return (
    <div className={classes.container}>
      <div className={joinClasses('control control-visibility')}>
        <GrDown className={joinClasses('collapse-symbol')} />
        <input
          checked={store.visible}
          type="checkbox"
          onChange={store.toggleVisibility}
        />
      </div>
      <div className={classes.control}>{store.name || store.id}</div>
    </div>
  );
};

export default observer(MapLayer);
