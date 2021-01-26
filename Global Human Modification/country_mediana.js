{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf600
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;\red25\green25\blue25;\red255\green255\blue255;}
{\*\expandedcolortbl;;\cssrgb\c12941\c12941\c12941;\cssrgb\c100000\c100000\c100000;}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\sl360\partightenfactor0

\f0\fs32 \cf2 \cb3 \expnd0\expndtw0\kerning0
\
var dataset = ee.ImageCollection('CSP/HM/GlobalHumanModification');\
var country = ee.FeatureCollection("users/lucabattistellageo/GAUL_ACP");\
\
var gHM_median = ee.Image(dataset.reduce(ee.Reducer.median())).clip(country);   \
\
\
var gHM_median_1 = gHM_median.reduceRegions(\{\
  'collection': country,\
  'reducer': ee.Reducer.median(),\
  'scale': 1000\
\});\
\
\
Map.addLayer (country);\
\
var visualization = \{\
  bands: ['gHM_median'],\
  min: 0.0,\
  max: 1.0,\
  palette: ['0c0c0c', '071aff', 'ff0000', 'ffbd03', 'fbff05', 'fffdfd']\
\};\
\
\
Map.addLayer(gHM_median, visualization, 'Human modification');\
\
Export.table.toDrive(\{\
  collection: gHM_median_1,\
  description: 'exportTableExample_test_median',\
  fileFormat: 'CSV'\
\});\
\
}