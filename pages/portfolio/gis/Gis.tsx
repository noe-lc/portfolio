import { useState } from 'react';

import Map from '../../../src/components/atoms/map';
import Sidebar from '../../../src/components/atoms/sidebar';
import SidebarTabs from '../../../src/components/atoms/sidebar/SidebarTabs';
import withGoogleMaps, {
  LoadScriptReturn,
} from '../../../src/components/hocs/with-google-maps';

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
    <div className="w-screen h-screen overflow-hidden">
      <main className="w-full h-full relative">
        <div className="w-full h-full">
          <Map
            LoadingComponent="Loading..."
            isLibraryLoaded={props.isLoaded}
            libraryLoadError={props.loadError}
            mapOptions={DEFAULT_MAP_OPTIONS}
            onMapSet={onMapSet}
          />
        </div>
        <p className="absolute right-0">Paragraph</p>
        <Sidebar>
          <SidebarTabs>
            <p>paragraph</p>
          </SidebarTabs>
        </Sidebar>
      </main>
    </div>
  );
}

export default withGoogleMaps({
  googleMapsApiKey: process.env.NEXT_PUBLIC_GM_API_KEY,
  preventGoogleFontsLoading: true,
})(Gis);
