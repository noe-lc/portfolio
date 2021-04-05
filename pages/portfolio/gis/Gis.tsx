import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
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
  const [activeTab, setActiveTab] = useState<string | number>('first');

  const areLayersLoaded = mapStore && mapStore.areLayersLoaded;

  const onMapSet = map => {
    setMapStore(new MapStore(map));
  };

  const onLayerLoaded = () => {
    mapStore.setLayersLoaded(mapStore.layers.every(layer => layer.isLoaded));
  };

  useEffect(() => {
    if (!mapStore) return;

    const sample = mapStore.addLayer('sample');
    sample.loadData('/110m_countries.geojson', {}, onLayerLoaded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapStore]);

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
        <Sidebar expand value={activeTab} onTabSelect={setActiveTab}>
          <SidebarTabs>
            <SidebarTab
              value="first"
              Icon={<IoLayersOutline className="inline" />}
            />
          </SidebarTabs>
          <SidebarContent>
            <SidebarPanel value="first">
              {areLayersLoaded ? (
                <LayerManager layers={mapStore.layers || []} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  Loading layers...
                </div>
              )}
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
})(observer(Gis));
