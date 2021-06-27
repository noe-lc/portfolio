import { makeObservable, observable } from 'mobx';

import MapLayer from './mapLayer';
import { ALLOWED_SYMBOL_TYPES, getDefaultSymbol } from '~/constants/symbols';
import { GeometryType } from '~/types/gis';
import { MapSymbol, SymbolTypes } from '~/types/symbol';

class LayerSymbol{
  public definition: MapSymbol;
  public readonly geometryType: GeometryType;
  readonly allowedTypes: SymbolTypes[];

  constructor(mapLayer: MapLayer, definition?: MapSymbol) {
    makeObservable(this, {
      definition: observable,
    });

    this.geometryType = mapLayer.geometryType;
    this.allowedTypes = ALLOWED_SYMBOL_TYPES[mapLayer.geometryType];

    this.init(mapLayer, definition);
  }

  private init(mapLayer: MapLayer, definition?: MapSymbol) {
    if (definition) {
      this.symbolize(definition);
    } else {
      const symbol = getDefaultSymbol(this.geometryType);
      this.symbolize({ type: SymbolTypes.single, symbol });
    }
  }

  symbolize(definition: MapSymbol) {
    const { type } = definition;

    if (!this.allowedTypes.includes(type)) {
      console.error(
        `Symbol \`${type}\` not compatible with ${this.geometryType}`
      );

      return;
    }

    switch (type) {
      case SymbolTypes.single:
        this.definition = definition as MapSymbol;
        break;
      case SymbolTypes.classified:
        // TODO: create the classified function

        this.definition = {
          type: SymbolTypes.classified,
          field: 'jaja',
          // symbol: [],
        };
        break;
      default:
        break;
    }
  }
}

export default LayerSymbol;
