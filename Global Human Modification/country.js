{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 var dataset = ee.ImageCollection('CSP/HM/GlobalHumanModification');\
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