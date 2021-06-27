export enum SymbolTypes {
  single = 'single',
  classified = 'classified',
  ruleBased = 'ruleBased',
}

export interface SingleSymbol {
  type: SymbolTypes.single;
  symbol: PolygonSymbol;
}

export interface NominalSymbol {
  type: SymbolTypes.classified;
  field: string;
  symbol?: [];
}

export type MapSymbol = SingleSymbol | NominalSymbol;

export interface PolygonSymbol {
  fillColor?: string;
  fillOpacity?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
}
