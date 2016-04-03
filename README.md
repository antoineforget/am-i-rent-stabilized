Am I Rent Stabilized?
============================
![](app/assets/png/airs_landing_page.png)

A mobile friendly, multi-lingual web app that informs NYC residents about [Rent Stabilization](http://www.nycrgb.org/html/resources/faq/rentstab.html) by simplifying the process of how to find out if their apartment may be rent stabilized, if they are paying too much rent, and what to do about it.  

See it in action at [amirentstabilized.com](https://amirentstabilized.com/).

## (Version 2) Runs on
- [Greensock's GSAP Animation Library](http://greensock.com/gsap)
- [CartoDB JS](http://docs.cartodb.com/cartodb-platform/cartodb-js.html)
- [CartoDB SQL API](http://docs.cartodb.com/cartodb-platform/sql-api.html)
- [CartoDB's Positron map tiles](http://cartodb.com/basemaps/)
- [NYC Geoclient API](https://developer.cityofnewyork.us/api/geoclient-api)
- [Handlebars.js](http://handlebarsjs.com/)
- [addToCalendar.js]()
- [addThis](http://addthis.com)

## Data Sources
- [NYC Map Pluto](http://www.nyc.gov/html/dcp/html/bytes/dwn_pluto_mappluto.shtml) (Tax Lot data)
- New York State's [HCR](http://www.nyshcr.org/) - [Rent Stabilized Buldings List](https://github.com/clhenrick/dhcr-rent-stabilized-data)
- [OpenStreetMap](http://wiki.openstreetmap.org/wiki/Main_Page)

## Installation
1. In terminal `cd` to this repo and do `bower install && npm install` to grab all dependencies.  
2. Host code on a webserver of your choice.

## Updating the Content:
As the site is translated to Chinese and Spanish, any changes to the site's content must also be translated to these languages. This is done by editing the Handlebars templates files in the `templates/` and the `JSON` files in `data/`. Each of these folders contains a file that corresponds to one page of the app (home, why-it-matters, how-it-works, resources). Each `JSON` file contains the content in 3 languages while each template file contains the markup and Handlebars templating code.

After updating these sets of files you must precompile the templates for them to be updated in the app. Make sure you have Node JS and the Handlebars module installed globally then do:

```
handlebars app/templates/*.hbs -n app.templates app/js/app/templates.js
```

## Data Processing:
The processed data is [publicly available for download on CartoDB](http://chenrick.cartodb.com/tables/all_nyc_likely_rent_stabl_merged/public) but if you'd like to host it yourself you may do the following (note you will need to have [GDAL](http://www.gdal.org/) and [PostGIS](http://postgis.net/) installed):

1. Aggregate NYC's MapPLUTO dataset using `ogr2ogr` (see bash scripts in `scripts` folder)
1. Import NYC MapPLUTO data into Postgres / PostGIS locally.
2. Query data in Postgres (see code in the `sql` folder for hints)
3. Import DHCR rent stabilized building list to Postres.
3. Join DHCR's rent stabilized building list to MapPluto.
4. Combine queried MapPLUTO data with DHCR joined data, export as GeoJSON.
2. Load the GeoJSON exported from Postgres to a CartoDB account (a free plan should suffice).
3. Point the CDB SQL API to the CartoDB account name and data table (it must be set to public).

## Credits
- Big thanks to [Caroline Woolard](http://carolinewoolard.com/) for suggesting the idea to me.

- [Jue Yang](https://github.com/jueyang) designed the awesome building graphics which informed the overall redesign of version 2 of the site.

- [BetaNYC](http://betanyc.us/) provided motivational and technical support.

- [Radish Lab](http://radishlab.com/) contributed the UI/UX design mockups of version 2.

### Fullscreen slides with GSAP's TweenLite, CSSPlugin and ScrollToPlugin
Forked from [Chrysto](http://codepen.io/bassta/)'s Pen [Fullscreen slides with TweenLite, CSSPlugin and ScrollToPlugin](http://codepen.io/bassta/pen/kDvmC/).

A [Pen](http://codepen.io/anon/pen/XJqaRg) by [Captain Anonymous](http://codepen.io/anon) on [CodePen](http://codepen.io/).

[License](http://codepen.io/anon/pen/XJqaRg/license).

## LICENSE
[Creative Commons Attribution-NonCommercial ](http://creativecommons.org/licenses/by-nc/4.0/)   
(CC BY-NC)

In other words: **_Not For Profit!_**
