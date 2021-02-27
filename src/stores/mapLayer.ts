import { makeObservable, observable } from 'mobx';

export enum LayerZoomRange {
  min = 0,
  max = 22,
}

export interface ILayerOptions {
  id?: string;
  name?: string;
  zoomRange?: [number, number];
}

export type IFullLayerOptions = ILayerOptions & google.maps.Data.DataOptions;

const DEFAULT_OPTIONS = {
  name: 'New Layer',
  zoomRange: [LayerZoomRange.min, LayerZoomRange.max],
};

class MapLayer {
  public name: string;
  public zoomRange: [number, number];
  public data: google.maps.Data;

  constructor(options: IFullLayerOptions) {
    makeObservable(this, {
      name: observable,
      zoomRange: observable,
    });

    const layerOptions = { ...DEFAULT_OPTIONS, ...options };

    this.data = new google.maps.Data(layerOptions);
    this.name = options.name;
    this.zoomRange = layerOptions.zoomRange as ILayerOptions['zoomRange'];
  }
}

export default MapLayer;
