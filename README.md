bird_sightings
==============

A relatively simple Drupal 7 module that implements a bird sightings web site.
This was really just a learning exercise so isn't anything fancy or truly
complete.

Uses bower for JS/CSS dependencies so need to run 'bower install' before
things are expected to function.

issues:
===============
ngRoute seems to hijack URLs when logged in as an administrator (only admin, odd).
If logged in as an admin links to Drupal pages simply aren't working.
The 'Log' tab does though so it can be clicked on and then on admin links.
Haven't looked into why yet but functions fine when not logged in or
logged in as a regular user.

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

