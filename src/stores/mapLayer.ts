import { action, makeObservable, observable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export enum LayerZoomRange {
  min = 0,
  max = 22,
}

export interface ILayerOptions {
  id?: string;
  name?: string;
  zoomRange?: [number, number];
  visible: boolean;
}

export type IFullLayerOptions = ILayerOptions & google.maps.Data.DataOptions;

//TODO: relocate this type
type GeometryType = 'Point' | 'LineString' | 'Polygon';

const DEFAULT_OPTIONS: ILayerOptions = {
  name: 'New Layer',
  zoomRange: [LayerZoomRange.min, LayerZoomRange.max],
  visible: true,
};

class MapLayer {
  public data: google.maps.Data;
  public geometryType: GeometryType;
  public id: string;
  public idProperty: string | number;
  public name: string;
  public zoomRange: [number, number];
  public visible: boolean;
  public style:
    | google.maps.Data.StyleOptions
    | google.maps.Data.StylingFunction;

  constructor(options: IFullLayerOptions) {
    makeObservable(this, {
      name: observable,
      zoomRange: observable,
      visible: observable,
      toggleVisibility: action.bound,
    });

    const layerOptions = { ...DEFAULT_OPTIONS, ...options };

    this.data = new google.maps.Data(layerOptions);
    this.id = options.id || uuidv4();
    this.name = options.name;
    this.zoomRange = layerOptions.zoomRange as ILayerOptions['zoomRange'];
    this.visible = !!layerOptions.visible;
    this.style = layerOptions.style || {};

    this.data.setStyle(this.style);
  }

  loadData(
    url: string,
    options?: google.maps.Data.GeoJsonOptions,
    callback?: (features: google.maps.Data.Feature[]) => void
  ) {
    this.idProperty = options?.idPropertyName;

    this.data.loadGeoJson(url, options, features => {
      const [feature] = features;
      const id = feature.getId();
      this.geometryType = feature.getGeometry().getType() as GeometryType;

      if (!this.idProperty) {
        feature.forEachProperty((name, value) => {
          if (value === id) {
            this.idProperty = name;
          }
        });
      }

      callback && callback(features);
    });
  }

  toggleVisibility(): void {
    const style = this.data.getStyle();
    const nextVisible = !this.visible;

    if (typeof style !== 'function') {
      style.visible = nextVisible;
      this.data.setStyle(style);
    }

    this.style = style;
    this.visible = nextVisible;
  }
}

export default MapLayer;
