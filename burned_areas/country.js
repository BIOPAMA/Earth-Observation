var display = true; 
var scale = 250; 
var c_select = ee.FeatureCollection("users/lucabattistellageo/GAUL_ACP"); 
var burnedArea = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
.filterDate('2019-01-01', '2019-12-31').select('BurnDate');

var burnedarea_sum = ee.Image(burnedArea.reduce(ee.Reducer.min()).clip(c_select));
burnedarea_sum = burnedarea_sum.where(burnedarea_sum.gt(0),1)

var area = ee.Image.pixelArea();
var burntArea = burnedarea_sum.multiply(area).divide(1000000).rename('burntArea');
burnedarea_sum = burnedarea_sum.addBands(burntArea);

print(burnedarea_sum)

var burnedArea_2019 = burntArea.reduceRegions({
  'collection': c_select,
  'reducer': ee.Reducer.sum(),
  'scale': scale
});
print(burnedArea_2019);

var baVis = {
  min: 1,
  max: 454798734,
  palette: ['ff0000']};

Export.table.toDrive({
  collection: burnedArea_2019,
  description:'loss',
  fileFormat: 'CSV'
});
Map.setCenter(0, 18, 2.1);
Map.addLayer(burnedarea_sum.select('burntArea'), baVis, 'Burned Area');
