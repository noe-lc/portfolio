import joinClasses from '~/utils/joinClasses';
import MapLayerStore from '~/stores/mapLayer';

import classes from './MapLayer.module.css';
import { observer } from 'mobx-react-lite';

interface IMapLayer {
  store: MapLayerStore;
}

const MapLayer: React.FC<IMapLayer> = ({ store }) => {
  return (
    <div className={classes.container}>
      <div className={joinClasses(classes, 'control control-visibility')}>
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
