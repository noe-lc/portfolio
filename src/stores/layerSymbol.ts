import { makeObservable, observable } from 'mobx';

import MapLayer from './mapLayer';
import { ALLOWED_SYMBOL_TYPES, getDefaultSymbol } from '~/constants/symbols';
import { GeometryType } from '~/types/gis';
import { SymbolDefinition, SymbolTypes, Single } from '~/types/symbol';

class LayerSymbol {
  public definition: SymbolDefinition;
  public readonly geometryType: GeometryType;
  readonly allowedTypes: SymbolTypes[];

  constructor(mapLayer: MapLayer, definition?: SymbolDefinition) {
    makeObservable(this, {
      definition: observable,
    });

    this.geometryType = mapLayer.geometryType;
    this.allowedTypes = ALLOWED_SYMBOL_TYPES[mapLayer.geometryType];

    this.init(mapLayer, definition);
  }

  private init(mapLayer: MapLayer, definition?: SymbolDefinition) {
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
        this.definition = definition as SymbolDefinition<Single>;
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
