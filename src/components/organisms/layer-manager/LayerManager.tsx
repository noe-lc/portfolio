import { VscDiffAdded } from 'react-icons/vsc';

import MapLayerStore from '~/stores/mapLayer';
import MapLayer from '~/components/atoms/map-layer';
import classes from './LayerManager.module.css';

interface ILayerManager {
  layers: MapLayerStore[];
}

const LayerManager: React.FC<ILayerManager> = props => {
  return (
    <div className={classes.layerManager}>
      <div className={classes.toolbar}>
        <VscDiffAdded title="Add a new layer" />
      </div>
      <div className={classes.content}>
        <ul>
          {props.layers.map(layer => (
            <li key={layer.id}>
              <MapLayer mapLayerStore={layer} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LayerManager;
