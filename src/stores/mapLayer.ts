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

const DEFAULT_OPTIONS: ILayerOptions = {
  name: 'New Layer',
  zoomRange: [LayerZoomRange.min, LayerZoomRange.max],
  visible: true,
};

class MapLayer {
  public data: google.maps.Data;
  public id: string;
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

  public toggleVisibility(): void {
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
