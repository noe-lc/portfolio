import { makeObservable, observable } from 'mobx';

import MapLayer from './mapLayer';
import { ALLOWED_SYMBOL_TYPES, getDefaultStyle } from '~/constants/symbols';
import { GeometryType } from '~/types/gis';
import { Symbol, SymbolTypes } from '~/types/symbol';

class LayerSymbol {
  public definition: Symbol;
  public readonly geometryType: GeometryType;
  readonly allowedTypes: SymbolTypes[];

  constructor(mapLayer: MapLayer, definition?: Symbol) {
    makeObservable(this, {
      definition: observable,
    });

    this.geometryType = mapLayer.geometryType;
    this.allowedTypes = ALLOWED_SYMBOL_TYPES[mapLayer.geometryType];

    this.init(mapLayer, definition);
  }

  private init(mapLayer: MapLayer, definition?: Symbol) {
    if (definition) {
      this.symbolize(definition);
    } else {
      const style = getDefaultStyle(this.geometryType);
      this.symbolize({ type: SymbolTypes.single, style });
    }
  }

  symbolize(definition: Symbol) {
    const { type } = definition;
    if (!this.allowedTypes.includes(type)) {
      console.error(
        `Symbol \`${type}\` not compatible with ${this.geometryType}`
      );

      return;
    }

    switch (definition.type) {
      case SymbolTypes.single:
        this.definition = definition;
        this.definition.style.geometryType = this.geometryType;
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
