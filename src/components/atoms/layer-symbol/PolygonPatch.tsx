import { PolygonSymbol } from '~/types/symbol';

interface IPolygonPatch {
  symbol: PolygonSymbol;
}

const PolygonPatch: React.FC<IPolygonPatch> = () => {
  return (
    <svg width={40} height={40}>
      <rect width="100%" height="100%" />
    </svg>
  );
};

export default PolygonPatch;
