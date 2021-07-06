import React from 'react';

import { PolygonStyle, SymbolStyle } from '~/types/symbol';
import useClasses from '~/hooks/useModuleClasses';

import classes from './LayerSymbol.module.css';

interface ILayerSymbol {
  symbolStyle: SymbolStyle;
  className?: string;
}

interface IPolygonSymbol {
  style: PolygonStyle;
  className?: string;
  onDoubleClick?: (evt: React.MouseEvent) => void;
}

export const PolygonSymbol: React.FC<IPolygonSymbol> = ({
  style,
  className,
  onDoubleClick,
}) => {
  const joinClasses = useClasses(classes);

  function handleOnDoubleClick(evt: React.MouseEvent) {
    if (onDoubleClick) onDoubleClick(evt);
  }

  if (Object.values(style).every(value => !value)) {
    <svg className={`c-polygon-sym ${className}`}>
      <rect width="100%" height="100%" onDoubleClick={handleOnDoubleClick} />
    </svg>;
  }

  return (
    <svg
      className={joinClasses(`c-polygon-sym polygon-sym ${className}`, true)}
    >
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

const LayerSymbol: React.FC<ILayerSymbol> = ({
  className = '',
  symbolStyle,
}) => {
  switch (symbolStyle.geometryType) {
    case 'Point':
      return <span>Point</span>;
    case 'LineString':
      return <span>Point</span>;
    case 'Polygon':
      return <PolygonSymbol style={symbolStyle} className={className} />;
    case 'MultiPolygon':
      return <PolygonSymbol style={symbolStyle} className={className} />;
    default:
      return <span>Default single symbol preview</span>;
  }
};

export default LayerSymbol;
