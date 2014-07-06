bird_sightings
==============

A relatively simple Drupal 7 module that implements a bird sightings web site.

Uses bower for JS/CSS dependencies so need to run 'bower install' before
things are expected to function.

dependencies:
================
Drupal Theme
http://ftp.drupal.org/files/projects/tweme-7.x-1.2-alpha1.tar.gz

Drupal Modules
(Might be incomplete and I think at least one or two are actually
not needed but haven't installed on a clean system yet and trimmed the fat).
http://ftp.drupal.org/files/projects/date-7.x-2.7.tar.gz
http://ftp.drupal.org/files/projects/entity-7.x-1.5.tar.gz
http://ftp.drupal.org/files/projects/features-7.x-2.0.tar.gz
http://ftp.drupal.org/files/projects/geolocation-7.x-1.4.tar.gz
http://ftp.drupal.org/files/projects/restws-7.x-2.1.tar.gz
http://ftp.drupal.org/files/projects/restws_search_api-7.x-1.1.tar.gz
http://ftp.drupal.org/files/projects/strongarm-7.x-2.0.tar.gz

The sightings logic is implemented in AngularJS with some Google Maps stuff.
It's implemented as a drupal block and expects the sight to have just (at least)
a main page with the bird sightings block added as its main content (all alone).
The login block should be placed on that single page in the left side bar and will
be hidden/shown by the app as necessary.

