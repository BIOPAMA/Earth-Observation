// average fishing hours in EEZ for 2016

var dataset = ee.ImageCollection('GFW/GFF/V1/fishing_hours')
                  .filter(ee.Filter.date('2016-01-01', '2016-12-31'));
var trawlers = dataset.select('trawlers');
var country = ee.FeatureCollection("users/lucabattistellageo/EEZ_ACP");
//---var country = country1.filterMetadata('iso2', 'equals', 'AGO');

// sum of fishing hours for all the days of the month for each pixel
var trawlers_sum = ee.Image(trawlers.reduce(ee.Reducer.sum())).clip(country);

// sum of fishing hours for all the days of the month for each pixel in each country
var trawlers_sum_2016 = trawlers_sum.reduceRegions({
  'collection': country,
  'reducer': ee.Reducer.sum(),
  'scale': 1000
});
print(trawlers_sum_2016);

Export.table.toDrive({
  collection: trawlers_sum_2016,
  description:'trawlers_sum_2016_01',
  fileFormat: 'CSV'
});

var trawlersVis = {
  min: 0.0,
  max: 2.0,
};
Map.addLayer(country, {color: 'FF0000'}, 'EEZ');
Map.addLayer(trawlers_sum, trawlersVis, 'Trawlers');
