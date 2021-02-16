import { useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';

interface IMap {
  LoadingComponent: ReactNode;
  onLoad?: (map: google.maps.Map) => void;
}

const Map: React.FC<IMap> = ({ LoadingComponent }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GM_API_KEY,
    preventGoogleFontsLoading: true,
  });

  function setMap(element: HTMLElement) {
    console.log('element :>> ', element);

    const map = new google.maps.Map(element, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }

  if (loadError) {
    return (
      <div className="w-full h-full flex justify-center content-center">
        <span className="block">An error has occurred.</span>
      </div>
    );
  }

  if (!isLoaded) {
    return <>{LoadingComponent}</>;
  }

  return <div ref={setMap} id="map" className="w-full h-full" />;
};

export default Map;
