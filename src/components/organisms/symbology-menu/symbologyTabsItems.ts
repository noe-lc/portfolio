import { TabItem } from '~/components/atoms/tabs/Tabs';
import { GeometryType } from '~/types/gis';

// TODO: complete the item constant based on the styles in ~/types/symbol.ts

const pointTabItems: Array<TabItem> = [
  {
    id: '1',
    label: 'Icon',
    content: null,
  },
];

const lineStringTabItems: Array<TabItem> = [
  {
    id: '1',
    label: 'Icon',
    content: null,
  },
];

const polygonStringItems: Array<TabItem> = [
  {
    id: '1',
    label: 'Stroke',
    content: null,
  },
  {
    id: '2',
    label: 'Fill',
    content: null,
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
          content: 'Invalid geometry',
        },
      ];
  }
}
