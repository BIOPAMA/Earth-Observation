// average fishing hours in pa for 2016

var dataset = ee.ImageCollection('GFW/GFF/V1/fishing_hours')
                  .filter(ee.Filter.date('2016-01-01', '2016-12-30'));
var trawlers = dataset.select('trawlers');
var pa = ee.FeatureCollection("users/lucabattistellageo/WDPA_05_ACP_202009");

var pa_m = pa.filterMetadata('marine', 'equals', 2);

var pa_select = pa_m.filter(ee.Filter.inList('iso3', 
ee.List(['GAB',
//'ATG','BDI','BEN','BSA','BHS','BLZ','BRB','BWA'
//'CAF','CIV','CMR','COD','COG','COK','COM','CPV','CUB','DJI','DMA','DOM',
//'ERI','ETH','FJI','FSM','GAB','GHA','GIN','GMB','GNB','GNQ','GRD','GUY',
//'HTI','JAM','KEN','KIR','KNA','LBR','LCA','LSO',
//'MDG','MHL','MLI','MOZ','MRT','MUS','MWI','NAM','NER','NGA','NIU','NRU',
//'PLW','PNG','RWA','SDN','SEN','SLB','SLE',
//'SOM','SSD','STP','SUR','SWZ',
//'TCD','TGO','TLS','TON','TTO','TUV','TZA','UGA','VCT','VUT','WSM','ZAF','ZMB','ZWE'

])));
var trawlers_sum = ee.Image(trawlers.reduce(ee.Reducer.sum()).clip(pa_select));


var trawlers_sum_2016 = trawlers_sum.reduceRegions({
  'collection': pa_select,
  'reducer': ee.Reducer.mean(),
  'scale': 250
});
print(trawlers_sum_2016);



var trawlersVis = {
  min: 0.0,
  max: 5.0,
};

Map.addLayer(trawlers_sum, trawlersVis, 'Trawlers');
