import MapLayer from '~/stores/mapLayer';

interface ILayerSymbol {
  store: MapLayer;
}

const LayerSymbol: React.FC<ILayerSymbol> = ({ store }) => {
  return <div>symbol</div>;
};

export default LayerSymbol;
