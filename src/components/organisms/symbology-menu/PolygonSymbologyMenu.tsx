import MapLayerStore from '~/stores/mapLayer';
import Tabs from '~/components/atoms/tabs/Tabs';
import { PolygonSymbol } from '~/components/atoms/layer-symbol/LayerSymbol';
import { PolygonStyle, SymbolTypes } from '~/types/symbol';
import { TabItem } from '~/components/atoms/tabs/Tabs';

import classes from './SymbologyMenu.module.css';

export type PolygonTabItem = 'stroke' | 'fill';

interface IPolygonSymbologyMenu {
  mapLayerStore: MapLayerStore;
  className?: string;
}

const polygonTabItems: Array<TabItem & { id: PolygonTabItem }> = [
  {
    id: 'stroke',
    label: 'Stroke',
  },
  {
    id: 'fill',
    label: 'Fill',
  },
];

const PolygonTabItems: React.FC<{ type: PolygonTabItem }> = ({ type }) => {
  if (type === 'stroke') {
    return <>'Stroke'</>;
  }
  if (type === 'fill') {
    return <>'Fill'</>;
  }
};

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

  return (
    <div className={classes.previewncontrols}>
      <div className={classes['preview-container']}>
        <h5 className={classes['preview-title']}>Preview</h5>
        {renderSymbol()}
      </div>
      <Tabs items={polygonTabItems}>
        {selectedItem => <PolygonTabItems type={selectedItem.id} />}
      </Tabs>
    </div>
  );
};

export default PolygonSymbologyMenu;
