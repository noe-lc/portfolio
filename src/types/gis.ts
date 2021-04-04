export enum LayerZoomRange {
  min = 0,
  max = 22,
}

export type GMDataStyle =
  | google.maps.Data.StyleOptions
  | google.maps.Data.StylingFunction;

export type GeometryType = 'Point' | 'LineString' | 'Polygon' | 'MultiPolygon';
