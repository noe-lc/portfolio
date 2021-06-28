import { GeometryType } from './gis';

export enum SymbolTypes {
  single = 'single',
  classified = 'classified',
  ruleBased = 'ruleBased',
}

export type PointStyle = Pick<
  google.maps.Data.StyleOptions,
  'cursor' | 'icon' | 'shape' | 'title'
> & { geometry: 'Point' };

export type LineStyle = Pick<
  google.maps.Data.StyleOptions,
  'strokeColor' | 'strokeOpacity' | 'strokeWeight'
> & { geometry: 'LineString' };

export type PolygonStyle = Pick<
  google.maps.Data.StyleOptions,
  'fillColor' | 'fillOpacity' | 'strokeColor' | 'strokeOpacity' | 'strokeWeight'
> & { geometry: 'Polygon' | 'MultiPolygon' };

export type SymbolStyle = PointStyle | LineStyle | PolygonStyle;

export interface SingleSymbol {
  type: SymbolTypes.single;
  style: SymbolStyle;
}

export interface NominalSymbol {
  type: SymbolTypes.classified;
  field: string;
  style?: [];
}

export type Symbol = SingleSymbol | NominalSymbol;
