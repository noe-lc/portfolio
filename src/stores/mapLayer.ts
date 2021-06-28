import { action, makeObservable, observable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

import LayerSymbol from '~/stores/layerSymbol';
import { getDefaultStyle } from '~/constants/symbols';
import { GeometryType, LayerZoomRange } from '~/types/gis';

export interface ILayerOptions {
  id?: string;
  name?: string;
  geometryType?: GeometryType;
  zoomRange?: [number, number];
  visible: boolean;
}

interface DataOptions extends google.maps.Data.DataOptions {
  style: google.maps.Data.StyleOptions;
}

export type IFullLayerOptions = ILayerOptions & DataOptions;

const DEFAULT_OPTIONS: IFullLayerOptions = {
  map: null,
  style: {},
  visible: true,
  name: 'New Layer',
  zoomRange: [LayerZoomRange.min, LayerZoomRange.max],
};

class MapLayer {
  data: google.maps.Data;
  geometryType: GeometryType;
  id: string;
  idProperty: string | number;
  name: string;
  zoomRange: [number, number];
  visible: boolean;
  style: google.maps.Data.StyleOptions;
  symbol: LayerSymbol;
  readonly isLoaded = false;

  constructor(options: IFullLayerOptions) {
    makeObservable(this, {
      name: observable,
      zoomRange: observable,
      visible: observable,
      isLoaded: observable,
      toggleVisibility: action.bound,
    });

    const layerOptions = { ...DEFAULT_OPTIONS, ...options };

    this.id = options.id || uuidv4();
    this.name = options.name;
    this.data = new google.maps.Data(layerOptions);
    this.visible = layerOptions.visible;
    this.zoomRange = layerOptions.zoomRange as ILayerOptions['zoomRange'];

    layerOptions.style.visible = this.visible;
    
    this.init(layerOptions);
  }

  private init(layerOptions: IFullLayerOptions) {
    if (layerOptions.geometryType) {
      this.applyStyle({
        ...getDefaultStyle(layerOptions.geometryType),
        ...layerOptions.style,
      });
    }
  }

  loadData(
    url: string,
    options?: google.maps.Data.GeoJsonOptions,
    callback?: (features: google.maps.Data.Feature[], ...args) => void
  ) {
    this.idProperty = options?.idPropertyName;

    this.data.loadGeoJson(url, options, features => {
      const [feature] = features;
      const geometryType = feature.getGeometry().getType() as GeometryType;

      this.geometryType = geometryType;
      this.symbol = new LayerSymbol(this);

      this.applyStyle({
        ...getDefaultStyle(geometryType),
        ...this.style,
      });

      if (!this.idProperty) {
        const id = feature.getId();
        feature.forEachProperty((name, value) => {
          if (value === id) {
            this.idProperty = name;
          }
        });
      }

      this['isLoaded' as any] = true;
      callback && callback(features);
    });
  }

  toggleVisibility(): void {
    const style = this.data.getStyle();
    const nextVisible = !this.visible;

    if (typeof style !== 'function') {
      style.visible = nextVisible;

      this.data.setStyle(style);
      this.style = style;
      this.visible = nextVisible;
    }

    // this.style = style;
    // this.visible = nextVisible;
  }

  applyStyle(style: google.maps.Data.StyleOptions) {
    this.data.setStyle(style);
    this.style = style;
  }
}

export default MapLayer;
