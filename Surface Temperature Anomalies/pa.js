var NCEP_TSurf = ee.ImageCollection("NCEP_RE/surface_temp"),
    MOD_LST = ee.ImageCollection("MODIS/006/MOD11A1"),
    MYD_LST = ee.ImageCollection("MODIS/006/MYD11A1");
    
// convert DN to [C]
function convertToCelsius(image){
  var result = image.toFloat().multiply(0.02).subtract(273.15)
  result = result.copyProperties(image, ['system:time_start']) 
  return result 
}

var ST_16 = ee.ImageCollection('MODIS/006/MYD11A1')
  .filterDate('2003-07-01', '2016-09-01')
  .filter(ee.Filter.calendarRange(7,8,'month'))
  .select('LST_Day_1km')
  .map(convertToCelsius)
  .mean();

var ST_20 = ee.ImageCollection('MODIS/006/MYD11A1')
  .filterDate('2020-07-01', '2020-09-01')
  .select('LST_Day_1km')
  .map(convertToCelsius)
  .mean();
var geography = ee.FeatureCollection("users/lucabattistellageo/WDPA_05_ACP_202009"); 

var anom_16_20 = ST_20.subtract(ST_16).clip(geography); 
var scale = 1000; 
var anomaly = anom_16_20.reduceRegions({
  'collection': geography,
  'reducer': ee.Reducer.mean(),
  'scale': scale
});

Export.table.toDrive({
  collection: anomaly,
  description: 'anomaly_16_20_',
  fileFormat: 'CSV'
});

var TAnom_viz = {min: -3,max: 3, palette: ['blue','white','red'],opacity: 0.5};

Map.addLayer(anom_16_20, TAnom_viz,'ST Anomaly [C]');
