import MapLayerStore from '~/stores/mapLayer';
import { PolygonStyle, SymbolStyle, SymbolTypes } from '~/types/symbol';

import classes from './SymbolPreview.module.css';

interface ISymbolPreview {
  className?: string;
  symbolStyle: SymbolStyle;
}

const PolygonSymbolPreview: React.FC<{ symbolStyle: PolygonStyle }> = ({
  symbolStyle,
}) => {
  if (Object.values(symbolStyle).every(value => !value)) {
    return <div className={classes['default-polygon-preview']} />;
  }

  const { fillColor, fillOpacity, strokeColor, strokeOpacity, strokeWeight } =
    symbolStyle;

  return (
    <div>
      <div
        className="polygon-symbol-preview"
        style={{
          backgroundColor: fillColor,
        }}
      />
    </div>
  );
};

const SymbolPreview: React.FC<ISymbolPreview> = ({ symbolStyle }) => {
  if (
    symbolStyle.geometry === 'Polygon' ||
    symbolStyle.geometry === 'MultiPolygon'
  ) {
    return <PolygonSymbolPreview symbolStyle={symbolStyle} />;
  }

  return <div className="">No preview available</div>;
};

export default SymbolPreview;
