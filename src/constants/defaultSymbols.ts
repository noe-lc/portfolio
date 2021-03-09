import { GeometryType } from '~/types/gis';
import { SymbolTypes, PolygonSymbol } from '~/stores/layerSymbol';

export const DEFAULT_POLYGON_SYMBOL: PolygonSymbol = {
  type: SymbolTypes.single,
  fillColor: '#000',
  fillOpacity: 0.25,
  strokeColor: '#000',
  strokeOpacity: 1,
  strokeWeight: 2,
};

const getDefaultSymbol = (geometry: GeometryType) => {
  switch (geometry) {
    case 'Polygon':
      return DEFAULT_POLYGON_SYMBOL;
    default:
      return {};
  }
};

export default getDefaultSymbol;
