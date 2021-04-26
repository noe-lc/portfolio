import React, { ReactNode, useCallback } from 'react';
import withGoogleMaps from '~/components/hocs/with-google-maps';

interface IMap {
  LoadingComponent: ReactNode;
  isLibraryLoaded: boolean;
  libraryLoadError?: Error;
  mapOptions?: google.maps.MapOptions;
  onMapSet: (map: google.maps.Map) => void;
}

const DEFAULT_MAP_OPTIONS = {
  center: { lat: -34.397, lng: 150.644 },
  zoom: 8,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  streetViewControl: false,
};

const Map: React.FC<IMap> = ({
  LoadingComponent,
  isLibraryLoaded,
  libraryLoadError,
  mapOptions,
  onMapSet,
}) => {
  const setMap = useCallback((element: HTMLElement) => {
    if (!element) {
      return;
    }

    const options = { ...DEFAULT_MAP_OPTIONS, ...mapOptions };
    const map = new google.maps.Map(element, options);
    onMapSet(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (libraryLoadError) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="block">An error has occurred.</span>
      </div>
    );
  }

  if (!isLibraryLoaded) {
    return <React.Fragment>{LoadingComponent}</React.Fragment>;
  }

  return <div ref={setMap} id="map" className="w-full h-full" />;
};

export default Map;
