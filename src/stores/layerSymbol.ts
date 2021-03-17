import { makeObservable, observable } from 'mobx';
import getDefaultSymbol from '~/constants/defaultSymbols';
import { GeometryType } from '~/types/gis';
import MapLayer from './mapLayer';

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

type SymbolDefinition = MapSymbol & {
  type: SymbolTypes.single | SymbolTypes.nominal | SymbolTypes.classified;
};

export interface PolygonSymbol {
  fillColor?: string;
  fillOpacity?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
}

const ALLOWED_SYMBOL_TYPES: Record<GeometryType, SymbolTypes[]> = {
  Point: [SymbolTypes.nominal],
  LineString: [SymbolTypes.nominal],
  Polygon: [SymbolTypes.nominal],
};

class LayerSymbol {
  public definition: SymbolDefinition;
  private geometryType: GeometryType;
  readonly allowedTypes: SymbolTypes[];

  constructor(mapLayer: MapLayer, definition?: SymbolDefinition) {
    makeObservable({
      definition: observable,
    });

    this.geometryType = mapLayer.geometryType;
    this.allowedTypes = ALLOWED_SYMBOL_TYPES[mapLayer.geometryType];

    if (definition) {
      this.symbolize(definition);
    } else {
      const symbol = getDefaultSymbol(this.geometryType);
      this.symbolize({ type: SymbolTypes.single, symbol });
    }
  }

  symbolize(definition: SymbolDefinition) {
    const { type } = definition;

    if (!this.allowedTypes.includes(type)) {
      console.error(
        `Symbol \`${type}\` not compatible with ${this.geometryType}`
      );
      return;
    }

    switch (type) {
      case SymbolTypes.single:
        this.definition = definition;
        break;
      case SymbolTypes.nominal:
        // TODO: create the nominal function

        this.definition = {
          type: SymbolTypes.nominal,
          field: 'jaja',
          symbol: [],
        };
        break;
      default:
        break;
    }
  }
}

export default LayerSymbol;
