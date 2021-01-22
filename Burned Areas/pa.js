var display = true; 
var scale = 1000; 
//var c_select = ee.FeatureCollection("users/lucabattistellageo/GAUL_ACP"); 

var country = ee.FeatureCollection("users/lucabattistellageo/WDPA_05_ACP_202009");
//var c_select = country.filterMetadata('iso3', 'equals', 'COD');
var c_select = country.filter(ee.Filter.inList('iso3', 
ee.List([
'AGO','ATG','BDI','BEN','BSA','BHS','BLZ','BRB','BWA'
//'CAF','CIV','CMR','COD','COG','COK','COM','CPV','CUB','DJI','DMA','DOM',
//'ERI','ETH','FJI','FSM','GAB','GHA','GIN','GMB','GNB','GNQ','GRD','GUY',
//'HTI','JAM','KEN','KIR','KNA','LBR','LCA','LSO',
//'MDG','MHL','MLI','MOZ','MRT','MUS','MWI','NAM','NER','NGA','NIU','NRU',
//'PLW','PNG','RWA','SDN','SEN','SLB','SLE',
//'SOM','SSD','STP','SUR','SWZ',
//'TCD','TGO','TLS','TON','TTO','TUV','TZA','UGA','VCT','VUT','WSM','ZAF','ZMB','ZWE'

])));

Map.addLayer(c_select);
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
  description:'pa_',
  fileFormat: 'CSV'
});

Map.setCenter(0, 18, 2.1);
Map.addLayer(burnedarea_sum.select('burntArea'), baVis, 'Burned Area');
