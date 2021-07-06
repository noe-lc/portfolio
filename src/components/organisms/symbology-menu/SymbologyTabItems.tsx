import { TabItem } from '~/components/atoms/tabs/Tabs';
import { GeometryType } from '~/types/gis';

// TODO: complete the item constant based on the styles in ~/types/symbol.ts
export type PointTabItem = 'cursor';
export type LineStringTabItem = 'stroke';

export const PointTabItems: React.FC<{ type: PointTabItem }> = ({ type }) => {
  if (type === 'cursor') {
    return <>Cursor</>;
  }
};

export const LineStringTabItems: React.FC<{ type: LineStringTabItem }> = ({
  type,
}) => {
  if (type === 'stroke') {
    return <>'Stroke'</>;
  }
  if (type === 'fill') {
    return <>'Fill'</>;
  }
};

const pointTabItems: Array<TabItem & { id: PointTabItem }> = [
  {
    id: 'cursor',
    label: 'Icon',
  },
];

const lineStringTabItems: Array<TabItem & { id: LineStringTabItem }> = [
  {
    id: 'stroke',
    label: 'stroke',
  },
];

export default function getSymbologyTabsItems(
  geometryType: GeometryType
): Array<TabItem> {
  switch (geometryType) {
    case 'Point':
      return pointTabItems;
    case 'LineString':
      return lineStringTabItems;
    default:
      return [
        {
          id: '1',
          label: 'Label',
        },
      ];
  }
}
