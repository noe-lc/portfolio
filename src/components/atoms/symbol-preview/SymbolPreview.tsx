import MapLayerStore from '~/stores/mapLayer';
import { SymbolTypes } from "~/types/symbol";

import classes from './SymbolPreview.module.css'

interface ISymbolPreview {
    className?: string,
    mapLayerStore: MapLayerStore 
}

const SymbolPreview: React.FC<ISymbolPreview> = ({ mapLayerStore }) => {

  return <div className={classes.preview} />;
}

export default SymbolPreview;