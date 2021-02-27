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
  zoomRange: [LayerZoomRange.min, LayerZoomRange.max],
};

class MapLayer extends google.maps.Data {
  public name: string;
  public zoomRange: [number, number];

  constructor(options: IFullLayerOptions) {
    super(options);
    makeObservable(this, {
      zoomRange: observable,
    });

    const layerOptions = { ...DEFAULT_OPTIONS, ...options };

    this.name = options.name;
    this.zoomRange = layerOptions.zoomRange as [number, number];
  }
}

export default MapLayer;
