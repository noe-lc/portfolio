import { observer } from 'mobx-react-lite';

import LayerSymbolStore from '~/stores/layerSymbol';
import { PolygonStyle, SymbolTypes } from '~/types/symbol';
import PolygonPatch from './PolygonPatch';

interface ILayerSymbol {
  layerSymbolStore: LayerSymbolStore;
}

const LayerSymbol: React.FC<ILayerSymbol> = ({ layerSymbolStore }) => {
  const definition = layerSymbolStore.definition;
  const { type } = definition;

  switch (type) {
    case SymbolTypes.single:
      return (
        <PolygonPatch
          symbol={definition.style as PolygonStyle}
          changeSymbol={() => undefined}
        />
      );
  }

  return <div>Unsupported symbol type</div>;
};

export default observer(LayerSymbol);
