import { PolygonSymbol } from '~/types/symbol';

interface IPolygonPatch {
  symbol: PolygonSymbol;
}

const PolygonPatch: React.FC<IPolygonPatch> = ({ symbol }) => {
  console.log('symbol :>> ', { ...symbol });
  return (
    <svg width={25} height={20}>
      <rect
        width="100%"
        height="100%"
        fill={symbol.fillColor}
        fillOpacity={symbol.fillOpacity}
        stroke={symbol.strokeColor}
        strokeWidth={symbol.strokeWeight}
        strokeOpacity={symbol.strokeOpacity}
      />
    </svg>
  );
};

export default PolygonPatch;
