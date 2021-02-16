import Map from '../../../src/components/atoms/Map';

export default function Gis(): React.ReactNode {
  function onLoad(map) {
    console.log('loaded');
  }

  return (
    <div className="w-screen h-screen relative">
      <div className="w-full h-full flex relative">
        <Map LoadingComponent="Loading..." onLoad={onLoad} />
      </div>
    </div>
  );
}
