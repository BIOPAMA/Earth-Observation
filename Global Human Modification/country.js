var dataset = ee.ImageCollection('CSP/HM/GlobalHumanModification');\
var country = ee.FeatureCollection("users/lucabattistellageo/GAUL_ACP");\
\
var gHM_mean = ee.Image(dataset.reduce(ee.Reducer.mean())).clip(country);   \
\
\
var gHM_mean_1 = gHM_mean.reduceRegions(\{\
  'collection': country,\
  'reducer': ee.Reducer.mean(),\
  'scale': 1000\
\});\
\
\
Map.addLayer (country);\
\
var visualization = \{\
  bands: ['gHM_mean'],\
  min: 0.0,\
  max: 1.0,\
  palette: ['0c0c0c', '071aff', 'ff0000', 'ffbd03', 'fbff05', 'fffdfd']\
\};\
\
\
Map.addLayer(gHM_mean, visualization, 'Human modification');\
\
Export.table.toDrive(\{\
  collection: gHM_mean_1,\
  description: 'exportTableExample_test',\
  fileFormat: 'CSV'\
\});\
}
