import React, { ReactNode, useCallback } from 'react';

interface IMap {
  LoadingComponent: ReactNode;
  isLibraryLoaded: boolean;
  libraryLoadError?: Error;
  mapOptions: google.maps.MapOptions;
  onMapSet: (map: google.maps.Map) => void;
}

const Map: React.FC<IMap> = ({
  LoadingComponent,
  isLibraryLoaded,
  libraryLoadError,
  mapOptions,
  onMapSet,
}) => {
  const setMap = useCallback((element: HTMLElement) => {
    if (element) {
      const map = new google.maps.Map(element, mapOptions);
      onMapSet(map);
    }
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
