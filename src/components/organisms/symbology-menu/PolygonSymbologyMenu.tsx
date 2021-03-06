import MapLayerStore from '~/stores/mapLayer';
import Tabs from '~/components/atoms/tabs/Tabs';
import ColorPicker from './CustomColorPicker';
import { PolygonSymbol } from '~/components/atoms/layer-symbol/LayerSymbol';
import { PolygonStyle, SymbolTypes } from '~/types/symbol';
import { TabItem } from '~/components/atoms/tabs/Tabs';

import pClasses from './SymbologyMenu.module.css';

export type PolygonTab = 'stroke' | 'fill';
type PolygonTabItem = TabItem & { type: PolygonTab };

interface IPolygonSymbologyMenu {
  mapLayerStore: MapLayerStore;
  className?: string;
}

const polygonTabItems: Array<PolygonTabItem> = [
  {
    id: 'polygon-stroke',
    type: 'stroke',
    label: 'Stroke',
  },
  {
    id: 'polygon-fill',
    type: 'fill',
    label: 'Fill',
  },
];

const PolygonSymbologyMenu: React.FC<IPolygonSymbologyMenu> = ({
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

  function renderItem(item: PolygonTabItem) {
    if (item.type === 'stroke') {
      return <ColorPicker />;
    }
    if (item.type === 'fill') {
      return <>'Fill'</>;
    }
  }

  return (
    <div className={pClasses.previewncontrols}>
      <div className={pClasses['preview-container']}>
        <h5 className={pClasses['preview-title']}>Preview</h5>
        {renderSymbol()}
      </div>
      <div className={pClasses['preview-controls']}>
        <Tabs items={polygonTabItems}>{renderItem}</Tabs>
      </div>
    </div>
  );
};

export default PolygonSymbologyMenu;
