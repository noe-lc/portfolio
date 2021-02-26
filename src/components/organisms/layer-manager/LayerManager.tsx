import { VscDiffAdded } from 'react-icons/vsc';

import MapLayer from '../../../stores/mapLayer';
import classes from './LayerManager.module.css';

console.log('classes :>> ', classes);

interface ILayerManager {
  layers: MapLayer[];
}

const LayerManager: React.FC<ILayerManager> = props => {
  return (
    <div className={classes.layerManager}>
      <div className={classes.toolbar}>
        <VscDiffAdded title="Add a new layer" />
      </div>
    </div>
  );
};

export default LayerManager;
