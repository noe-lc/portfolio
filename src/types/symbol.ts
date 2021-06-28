export enum SymbolTypes {
  single = 'single',
  classified = 'classified',
  ruleBased = 'ruleBased',
}

export type PointStyle = Pick<
  google.maps.Data.StyleOptions,
  'cursor' | 'icon' | 'shape' | 'title'
> & { geometryType: 'Point' };

export type LineStyle = Pick<
  google.maps.Data.StyleOptions,
  'strokeColor' | 'strokeOpacity' | 'strokeWeight'
> & { geometryType: 'LineString' };

export type PolygonStyle = Pick<
  google.maps.Data.StyleOptions,
  'fillColor' | 'fillOpacity' | 'strokeColor' | 'strokeOpacity' | 'strokeWeight'
> & { geometryType: 'Polygon' | 'MultiPolygon' };

export type SymbolStyle = PointStyle | LineStyle | PolygonStyle;

export interface SingleSymbol {
  type: SymbolTypes.single;
  style: SymbolStyle;
}

export interface ClassifiedSymbol {
  type: SymbolTypes.classified;
  field: string;
  style?: [];
}

export type Symbol = SingleSymbol | ClassifiedSymbol;
