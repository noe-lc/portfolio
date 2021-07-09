import MapLayerStore from '~/stores/mapLayer';
import Tabs from '~/components/atoms/tabs/Tabs';
import { PolygonSymbol } from '~/components/atoms/layer-symbol/LayerSymbol';
import { PolygonStyle, SymbolTypes } from '~/types/symbol';
import { TabItem } from '~/components/atoms/tabs/Tabs';

import pClasses from './SymbologyMenu.module.css';

export type PointTab = 'cursor';
type PointTabItem = TabItem & { type: PointTab };

interface IPointSymbologyMenu {
  mapLayerStore: MapLayerStore;
  className?: string;
}

const pointTabItems: Array<PointTabItem> = [
  {
    id: 'point-cursor',
    type: 'cursor',
    label: 'Cursor',
  },
];

const PointSymbologyMenu: React.FC<IPointSymbologyMenu> = ({
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

  function renderItem(item: PointTabItem) {
    if (item.type === 'cursor') {
      return <>'Stroke'</>;
    }
  }

  return (
    <div className={pClasses.previewncontrols}>
      <div className={pClasses['preview-container']}>
        <h5 className={pClasses['preview-title']}>Preview</h5>
        {renderSymbol()}
      </div>
      <Tabs items={pointTabItems}>{renderItem}</Tabs>
    </div>
  );
};

export default PointSymbologyMenu;
