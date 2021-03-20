import { makeObservable, observable } from 'mobx';

import { ALLOWED_SYMBOL_TYPES, getDefaultSymbol } from '~/constants/symbols';
import { GeometryType } from '~/types/gis';
import { SymbolDefinition, SymbolTypes } from '~/types/symbol';
import MapLayer from './mapLayer';

class LayerSymbol {
  public definition: SymbolDefinition;
  private geometryType: GeometryType;
  readonly allowedTypes: SymbolTypes[];

  constructor(mapLayer: MapLayer, definition?: SymbolDefinition) {
    makeObservable(this, {
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
