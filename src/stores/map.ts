import { makeObservable, observable } from 'mobx';

import MapLayer, { IFullLayerOptions } from './mapLayer';

type MapLayerOptions = Omit<IFullLayerOptions, 'map'>;

interface IMapConfig {
  layers?: MapLayer[];
}

const DEFAULT_OPTIONS = {
  layers: [],
};

class Map {
  public map: google.maps.Map;
  public layers: MapLayer[];

  constructor(map: google.maps.Map, options: IMapConfig) {
    makeObservable(this, {
      layers: observable.shallow,
    });

    const storeOptions = { ...DEFAULT_OPTIONS, ...options };

    this.map = map;
    this.layers = storeOptions.layers;
  }

  public addLayer(layer: MapLayer): MapLayer;
  public addLayer(
    nameOrLayer: string | MapLayer,
    options?: MapLayerOptions
  ): MapLayer {
    let layer: MapLayer;

    if (!nameOrLayer) {
      const name = `New layer ${this.layers.length + 1}`;
      layer = new MapLayer({ map: this.map, name, ...options });
    }

    if (typeof nameOrLayer === 'string') {
      layer = new MapLayer({ map: this.map, name: nameOrLayer, ...options });
    }

    layer = layer || (nameOrLayer as MapLayer);
    this.layers.push(layer);
    return layer;
  }
}

export default Map;
