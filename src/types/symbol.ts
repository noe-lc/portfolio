export enum SymbolTypes {
  single = 'single',
  classified = 'classified',
  ruleBased = 'ruleBased',
}

export interface Single {
  symbol: PolygonSymbol;
}

export interface Nominal {
  field: string;
  symbol?: [];
}

type MapSymbol = Single | Nominal;

export type SymbolDefinition<T extends MapSymbol = MapSymbol> = T & {
  type: SymbolTypes.single | SymbolTypes.classified | SymbolTypes.classified;
};

export interface PolygonSymbol {
  fillColor?: string;
  fillOpacity?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
}
