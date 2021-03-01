import { makeObservable, observable } from 'mobx';
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
  public id: string;
  public name: string;
  public zoomRange: [number, number];
  public visible: boolean;
  public data: google.maps.Data;

  constructor(options: IFullLayerOptions) {
    makeObservable(this, {
      name: observable,
      zoomRange: observable,
      visible: observable,
    });

    const layerOptions = { ...DEFAULT_OPTIONS, ...options };

    this.id = options.id || uuidv4();
    this.name = options.name;
    this.data = new google.maps.Data(layerOptions);
    this.zoomRange = layerOptions.zoomRange as ILayerOptions['zoomRange'];
  }
}

export default MapLayer;
