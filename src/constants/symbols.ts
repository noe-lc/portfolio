import { GeometryType } from '~/types/gis';
import { PolygonSymbol, SymbolTypes } from '~/types/symbol';

export const ALLOWED_SYMBOL_TYPES: Record<GeometryType, SymbolTypes[]> = {
  Point: [SymbolTypes.single, SymbolTypes.classified],
  LineString: [SymbolTypes.single, SymbolTypes.classified],
  Polygon: [SymbolTypes.single, SymbolTypes.classified],
  MultiPolygon: [SymbolTypes.single, SymbolTypes.classified],
};

export const DEFAULT_POLYGON_SYMBOL: PolygonSymbol = {
  fillColor: '#000',
  fillOpacity: 0.25,
  strokeColor: '#000',
  strokeOpacity: 1,
  strokeWeight: 1,
};

export const getDefaultSymbol = (geometry: GeometryType) => {
  switch (geometry) {
    case 'Polygon':
    case 'MultiPolygon':
      return DEFAULT_POLYGON_SYMBOL;
    default:
      return {};
  }
};
