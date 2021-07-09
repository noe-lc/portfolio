import MapLayerStore from '~/stores/mapLayer';
import Tabs from '~/components/atoms/tabs/Tabs';
import { PolygonSymbol } from '~/components/atoms/layer-symbol/LayerSymbol';
import { PolygonStyle, SymbolTypes } from '~/types/symbol';
import { TabItem } from '~/components/atoms/tabs/Tabs';

import pClasses from './SymbologyMenu.module.css';

export type LineStringTab = 'stroke';
type LineStringTabItem = TabItem & { type: LineStringTab };

interface ILineStringSymbologyMenu {
  mapLayerStore: MapLayerStore;
  className?: string;
}

const lineStringTabItems: Array<LineStringTabItem> = [
  {
    id: 'polygon-stroke',
    type: 'stroke',
    label: 'Stroke',
  },
];

const LineStringSymbologyMenu: React.FC<ILineStringSymbologyMenu> = ({
  mapLayerStore,
}) => {
  const symbolDef = mapLayerStore.symbol.definition;
  const type = symbolDef.type;
  const style = symbolDef.style as PolygonStyle;

  function renderSymbol() {
    if (type === SymbolTypes.single) {
      return <PolygonSymbol style={style} />;
    }

    if (type === SymbolTypes.classified) {
      return <>List of symbols...</>;
    }
  }

  function renderItem(item: LineStringTabItem) {
    if (item.type === 'stroke') {
      return <>'Stroke'</>;
    }
  }

  return (
    <div className={pClasses.previewncontrols}>
      <div className={pClasses['preview-container']}>
        <h5 className={pClasses['preview-title']}>Preview</h5>
        {renderSymbol()}
      </div>
      <Tabs items={lineStringTabItems}>{renderItem}</Tabs>
    </div>
  );
};

export default LineStringSymbologyMenu;
