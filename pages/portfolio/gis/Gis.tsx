import { useState } from 'react';
import { AiFillAccountBook } from 'react-icons/ai';

import Map from '~components/atoms/map';
import Sidebar, {
  SidebarTabs,
  SidebarContent,
  SidebarTab,
} from '~components/atoms/sidebar';
import withGoogleMaps, {
  LoadScriptReturn,
} from '~components/hocs/with-google-maps';

const DEFAULT_MAP_OPTIONS: google.maps.MapOptions = {
  center: { lat: -34.397, lng: 150.644 },
  zoom: 8,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  streetViewControl: false,
};

function Gis<P extends LoadScriptReturn>(props: P) {
  const [map, setMap] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

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

        <Sidebar value={activeTab}>
          <SidebarTabs onTabSelect={setActiveTab}>
            <SidebarTab
              isActive
              value="first"
              Icon={<AiFillAccountBook className="inline" />}
            />
          </SidebarTabs>
          <SidebarContent>Hello wrld</SidebarContent>
        </Sidebar>
      </main>
    </div>
  );
}

export default withGoogleMaps({
  googleMapsApiKey: process.env.NEXT_PUBLIC_GM_API_KEY,
  preventGoogleFontsLoading: true,
})(Gis);
