import { TabItem } from '~/components/atoms/tabs/Tabs';
import { GeometryType } from '~/types/gis';

// TODO: complete the item constant based on the styles in ~/types/symbol.ts

export type SymbologyTabItem = TabItem & { Component: React.FC };
export type PointTabItem = 'cursor';
export type LineStringTabItem = 'stroke';
export type PolygonTabItem = 'stroke' | 'fill';

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

export const PolygonTabItems: React.FC<{ type: PolygonTabItem }> = ({
  type,
}) => {
  if (type === 'stroke') {
    return <>'Stroke'</>;
  }
  if (type === 'fill') {
    return <>'Fill'</>;
  }
};

const pointTabItems: Array<SymbologyTabItem & { id: PointTabItem }> = [
  {
    id: 'cursor',
    label: 'Icon',
    Component: PointTabItems,
  },
];

const lineStringTabItems: Array<SymbologyTabItem & { id: LineStringTabItem }> =
  [
    {
      id: 'stroke',
      label: 'stroke',
      Component: LineStringTabItems,
    },
  ];

const polygonStringItems: Array<SymbologyTabItem & { id: PolygonTabItem }> = [
  {
    id: 'stroke',
    label: 'Stroke',
    Component: PolygonTabItems,
  },
  {
    id: 'fill',
    label: 'Fill',
    Component: PolygonTabItems,
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
    case 'Polygon':
    case 'MultiPolygon':
      return polygonStringItems;
    default:
      return [
        {
          id: '1',
          label: 'Label',
        },
      ];
  }
}
