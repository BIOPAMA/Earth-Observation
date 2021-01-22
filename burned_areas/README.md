# Burned Areas in ACP Countries for 2019
The MODIS Fire_cci Burned Area pixel product version 5.1 (FireCCI51) is a monthly global ~250m spatial resolution dataset containing information on burned area as well as ancillary data. It is based on surface reflectance in the Near Infrared (NIR) band from the MODIS instrument onboard the Terra satellite, as well as active fire information from the same sensor of the Terra and Aqua satellites.

The burned area algorithm uses a two-phase hybrid approach. In a first step pixels with a high probability of being burned (called "seeds") are detected based on the active fires. In a second one, a contextual growing is applied to completely detect the fire patch. This growing phase is controlled by an adaptive thresholding, where thresholds are computed based on the specific characteristics of the area surrounding each seed. The variable used to guide the whole detection process is the NIR drop between pre- and post-fire images.

The dataset includes for each pixel the estimated day of the first detection of the fire, the confidence level of that detection, and the land cover that has been burned (extracted from the ESA CCI Land Cover dataset v2.0.7). In addition, an observation flag is provided to identify the pixels that were not processed due to the lack of valid observations or because they belong to a non-burnable land cover.

FireCCI51 was developed as part of the ESA Climate Change Initiative (CCI) Programme, and it is also part of the Copernicus Climate Change Service (C3S).

## Use

Burned area in 2019 computed using ESA CCI Burned Area Pixel product. Analysis performed by L. Battistella in December 2020. 
Use the raw csv to retrieve all data or single country or PA data given the parameter: iso3 or wdpaid

