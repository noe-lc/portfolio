import { GeometryType } from '~/types/gis';

enum SymbolTypes {
  nominal = 'nominal',
  classified = 'classified',
}

interface NominalSymbol {
  type: string;
  field: string;
  colorScheme: any;
}

const ALLOWED_SYMBOL_TYPES: Record<GeometryType, SymbolTypes[]> = {
  Point: [SymbolTypes.nominal],
  LineString: [SymbolTypes.nominal],
  Polygon: [SymbolTypes.nominal],
};

class LayerSymbol {
  readonly geometry: GeometryType;
  readonly allowedTypes: SymbolTypes[];

  constructor(geometry: GeometryType) {
    this.geometry = geometry;
    this.allowedTypes = ALLOWED_SYMBOL_TYPES[geometry];
  }

  symbolize(type: SymbolTypes) {
    if (!this.allowedTypes.includes(type)) {
      console.error(`Symbol \`${type}\` not compatible with ${this.geometry} `);
    }
  }
}

export default LayerSymbol;
