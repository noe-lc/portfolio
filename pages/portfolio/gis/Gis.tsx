import { useState } from 'react';

import Map from '../../../src/components/atoms/map';
import withGoogleMaps, {
  LoadScriptReturn,
} from '../../../src/components/hocs/with-google-maps';
import LayerManager from '../../../src/components/organisms/layer-manager';

const DEFAULT_MAP_OPTIONS: google.maps.MapOptions = {
  center: { lat: -34.397, lng: 150.644 },
  zoom: 8,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  streetViewControl: false,
};

function Gis<P extends LoadScriptReturn>(props: P) {
  const [map, setMap] = useState(null);

  const onMapSet = map => {
    setMap(map);
  };

  return (
    <div className="w-screen h-screen relative">
      <main className="w-full h-full flex relative">
        <div className="flex-auto">
          <Map
            LoadingComponent="Loading..."
            isLibraryLoaded={props.isLoaded}
            libraryLoadError={props.loadError}
            mapOptions={DEFAULT_MAP_OPTIONS}
            onMapSet={onMapSet}
          />
        </div>
        <LayerManager />
      </main>
    </div>
  );
}

export default withGoogleMaps({
  googleMapsApiKey: process.env.NEXT_PUBLIC_GM_API_KEY,
  preventGoogleFontsLoading: true,
})(Gis);
