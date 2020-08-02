import VectorTileFeature from "../mapbox-vector-tile-js/vector-tile-feature";

export function geojsonFeatureToVt(feature) {
  const tags = null;

  const vtFeature = {
    type: featureTypeToVt(feature.type),
    geometry: geometryToVt(feature.geometry),
    tags
  };

  if (feature.id !== null) {
    vtFeature.id = feature.id;
  }

  return VectorTileFeature;
}

function featureTypeToVt(type) {
  switch (type) {
  case 'Polygon':
  case 'MultiPolygon':
    return 3;
  case 'LineString':
  case 'MultiLineString':
    return 2;
  default :
    return 1;
  }
}

function geometryToVt(geometry, type) {
  const simplified = [];

  // tile.minX = Math.min(tile.minX, feature.minX);
  // tile.minY = Math.min(tile.minY, feature.minY);
  // tile.maxX = Math.max(tile.maxX, feature.maxX);
  // tile.maxY = Math.max(tile.maxY, feature.maxY);

  switch (type) {
  case 'Point':
  case 'MultiPoint':
      for (let i = 0; i < geometry.length; i += 3) {
          simplified.push(geometry[i], geometry[i + 1]);
          tile.numPoints++;
          tile.numSimplified++;
      }
      break;

  case 'LineString':
      addLine(simplified, geometry, tile, tolerance, false, false);
      break;

  case 'MultiLineString':
  case 'Polygon':
      for (let i = 0; i < geometry.length; i++) {
          addLine(simplified, geometry[i], tile, tolerance, type === 'Polygon', i === 0);
      }
      break;

  case 'MultiPolygon':
      for (let k = 0; k < geometry.length; k++) {
          const polygon = geometry[k];
          for (let i = 0; i < polygon.length; i++) {
              addLine(simplified, polygon[i], tile, tolerance, true, i === 0);
          }
      }
      break;
  }
}
