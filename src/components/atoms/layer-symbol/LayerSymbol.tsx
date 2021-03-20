import LayerSymbolStore from '~/stores/layerSymbol';
import { SymbolTypes } from '~/types/symbol';

interface ILayerSymbol {
  store: LayerSymbolStore;
}

const LayerSymbol: React.FC<ILayerSymbol> = ({ store }) => {
  const definition = store.definition;
  const { type } = definition;

  switch (type) {
    case SymbolTypes.single:
      return <>'Single'</>;
  }

  return <div>Unsupported symbol type</div>;
};

export default LayerSymbol;
