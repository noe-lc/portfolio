import { VscDiffAdded } from 'react-icons/vsc';

import MapLayer from '../../../stores/mapLayer';
import classes from './LayerManager.module.css';

interface ILayerManager {
  layers: MapLayer[];
}

const LayerManager: React.FC<ILayerManager> = props => {
  return (
    <div className={classes.layerManager}>
      <div className={classes.toolbar}>
        <VscDiffAdded title="Add a new layer" />
      </div>
      <div className={classes.content}>
        {props.layers.map((layer, i) => (
          <span key={i}>layer</span>
        ))}
      </div>
    </div>
  );
};

export default LayerManager;
