export enum SymbolTypes {
  single = 'single',
  nominal = 'nominal',
  classified = 'classified',
}

interface Single {
  symbol: PolygonSymbol;
}

interface Nominal {
  field: string;
  symbol?: [];
}

type MapSymbol = Single | Nominal;

export type SymbolDefinition = MapSymbol & {
  type: SymbolTypes.single | SymbolTypes.nominal | SymbolTypes.classified;
};

export interface PolygonSymbol {
  fillColor?: string;
  fillOpacity?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
}
