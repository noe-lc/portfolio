import { observer } from 'mobx-react-lite';

import LayerSymbolStore from '~/stores/layerSymbol';
import { PolygonSymbol, SymbolTypes } from '~/types/symbol';
import PolygonPatch from './PolygonPatch';

interface ILayerSymbol {
  store: LayerSymbolStore;
}

const LayerSymbol: React.FC<ILayerSymbol> = ({ store }) => {
  const definition = store.definition;
  const { type } = definition;

  switch (type) {
    case SymbolTypes.single:
      return (
        <>
          {<PolygonPatch symbol={definition.symbol as PolygonSymbol} />}Single
        </>
      );
  }

  return <div>Unsupported symbol type</div>;
};

export default observer(LayerSymbol);
