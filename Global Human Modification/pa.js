var dataset = ee.ImageCollection('CSP/HM/GlobalHumanModification');
var pa = ee.FeatureCollection("users/lucabattistellageo/WDPA_05_ACP_202009"); //serie di poligoni anche diversi tra loro
var pa_m = pa.filterMetadata('marine', 'equals', 0);
var gHM_mean = ee.Image(dataset.reduce(ee.Reducer.mean())).clip(pa_m);   
 

var gHM_mean_1 = gHM_mean.reduceRegions({
  'collection': pa_m,
  'reducer': ee.Reducer.mean(),
  'scale': 1000
});
 

Map.addLayer (pa_m);
 
var visualization = {
  bands: ['gHM_mean'],
  min: 0.0,
  max: 1.0,
  palette: ['0c0c0c', '071aff', 'ff0000', 'ffbd03', 'fbff05', 'fffdfd']
};
 

Map.addLayer(gHM_mean, visualization, 'Human modification');
 
Export.table.toDrive({
  collection: gHM_mean_1,
  description: 'exportTableExample_test',
  fileFormat: 'CSV'
});
