export enum SymbolTypes {
  single = 'single',
  nominal = 'nominal',
  classified = 'classified',
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
  type: SymbolTypes.single | SymbolTypes.nominal | SymbolTypes.classified;
};

export interface PolygonSymbol {
  fillColor?: string;
  fillOpacity?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
}
