import React from 'react';

import { PolygonStyle, SymbolStyle } from '~/types/symbol';
import useClasses from '~/hooks/useModuleClasses';

import classes from './LayerSymbol.module.css';

interface IPolygonSymbolPreview {
  style: PolygonStyle;
  onDoubleClick?: (evt: React.MouseEvent) => void;
}

const PolygonSymbol: React.FC<IPolygonSymbolPreview> = ({
  style,
  onDoubleClick,
}) => {
  const joinClasses = useClasses(classes);

  function handleOnDoubleClick(evt: React.MouseEvent) {
    if (onDoubleClick) onDoubleClick(evt);
  }

  if (Object.values(style).every(value => !value)) {
    <svg className="c-polygon-sym">
      <rect width="100%" height="100%" onDoubleClick={handleOnDoubleClick} />
    </svg>;
  }

  return (
    <svg className={joinClasses('c-polygon-sym polygon-sym', true)}>
      <rect
        width="100%"
        height="100%"
        fill={style.fillColor}
        fillOpacity={style.fillOpacity}
        stroke={style.strokeColor}
        strokeWidth={style.strokeWeight}
        strokeOpacity={style.strokeOpacity}
        onDoubleClick={handleOnDoubleClick}
      />
    </svg>
  );
};

const LayerSymbol: React.FC<{ symbolStyle: SymbolStyle }> = ({
  symbolStyle,
}) => {
  switch (symbolStyle.geometryType) {
    case 'Point':
      return <span>Point</span>;
    case 'LineString':
      return <span>Point</span>;
    case 'Polygon':
      return <PolygonSymbol style={symbolStyle} />;
    case 'MultiPolygon':
      return <PolygonSymbol style={symbolStyle} />;
    default:
      return <span>Default single symbol preview</span>;
  }
};

export default LayerSymbol;
