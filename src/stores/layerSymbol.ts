import { GeometryType } from '~/types/gis';
import MapLayer from './mapLayer';

export enum SymbolTypes {
  single = 'single',
  nominal = 'nominal',
  classified = 'classified',
}

interface Nominal {
  type: string;
  field: string;
  colorScheme: any;
}

export interface PolygonSymbol {
  type: SymbolTypes;
  fillColor: string;
  fillOpacity: number;
  strokeColor: string;
  strokeOpacity: number;
  strokeWeight: number;
}

const ALLOWED_SYMBOL_TYPES: Record<GeometryType, SymbolTypes[]> = {
  Point: [SymbolTypes.nominal],
  LineString: [SymbolTypes.nominal],
  Polygon: [SymbolTypes.nominal],
};

class LayerSymbol {
  private geometry: GeometryType;
  readonly allowedTypes: SymbolTypes[];

  constructor(mapLayer: MapLayer) {
    this.geometry = mapLayer.geometryType;
    this.allowedTypes = ALLOWED_SYMBOL_TYPES[mapLayer.geometryType];
  }

  symbolize(type: SymbolTypes) {
    if (!this.allowedTypes.includes(type)) {
      console.error(`Symbol \`${type}\` not compatible with ${this.geometry} `);
    }
  }
}

export default LayerSymbol;
