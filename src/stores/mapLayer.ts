import { makeObservable, observable } from 'mobx';

interface ILayerConfig extends google.maps.Data.DataOptions {
  name: string;
  zoomRange: [number, number];
}

class MapLayer extends google.maps.Data {
  public name: string;
  public zoomRange: [number, number];

  constructor(config: ILayerConfig) {
    super(config);
    makeObservable(this, {
      zoomRange: observable,
    });
    this.name = config.name;
    this.zoomRange = config.zoomRange;
  }
}

export default MapLayer;
