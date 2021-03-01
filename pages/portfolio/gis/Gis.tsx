import { useState } from 'react';
import { IoLayersOutline } from 'react-icons/io5';

import MapStore from '~/stores/map';
import Map from '~components/atoms/map';
import Sidebar, {
  SidebarTabs,
  SidebarContent,
  SidebarTab,
  SidebarPanel,
} from '~components/atoms/sidebar';
import withGoogleMaps, {
  LoadScriptReturn,
} from '~components/hocs/with-google-maps';
import LayerManager from '~components/organisms/layer-manager';

function Gis<P extends LoadScriptReturn>(props: P) {
  const [mapStore, setMapStore] = useState<MapStore>(null);
  const [activeTab, setActiveTab] = useState(null);

  const onMapSet = map => {
    const store = new MapStore(map);
    const sample = store.addLayer('sample');
    sample.data.loadGeoJson('/110m_countries.geojson');

    setMapStore(store);
  };

  const remove = () => {
    mapStore.removeLayer(mapStore.layers[0].id);
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <main className="w-full h-full relative">
        <div className="w-full h-full">
          <Map
            LoadingComponent="Loading..."
            isLibraryLoaded={props.isLoaded}
            libraryLoadError={props.loadError}
            onMapSet={onMapSet}
          />
        </div>
        <Sidebar value={activeTab} onTabSelect={setActiveTab}>
          <SidebarTabs>
            <SidebarTab
              value="first"
              Icon={<IoLayersOutline className="inline" />}
            />
            <SidebarTab
              value="second"
              Icon={<IoLayersOutline className="inline" />}
            />
          </SidebarTabs>
          <SidebarContent>
            <SidebarPanel value="first">
              {mapStore && <LayerManager layers={mapStore.layers || []} />}
            </SidebarPanel>
          </SidebarContent>
        </Sidebar>
      </main>
    </div>
  );
}

export default withGoogleMaps({
  googleMapsApiKey: process.env.NEXT_PUBLIC_GM_API_KEY,
  preventGoogleFontsLoading: true,
})(Gis);
