import joinClasses from '~/utils/joinClasses';
import MapLayerStore from '~/stores/mapLayer';

import classes from './MapLayer.module.css';

interface IMapLayer {
  store: MapLayerStore;
}

const MapLayer: React.FC<IMapLayer> = ({ store }) => {
  return (
    <div className={classes.container}>
      <div className={joinClasses(classes, 'control control-visibility')}>
        <input checked={store.visible} type="checkbox" />
      </div>
      {store.name || store.id}
    </div>
  );
};

export default MapLayer;
