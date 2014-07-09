# bird_sightings

A relatively simple Drupal 7 module that implements a bird sightings web site.
This was really just a learning exercise so isn't anything fancy or truly
complete.

Uses bower for JS/CSS dependencies so need to run 'bower install' before
things are expected to function.

# Dependencies:
## Drupal Theme
http://ftp.drupal.org/files/projects/tweme-7.x-1.2-alpha1.tar.gz

Other themes should work fine BUT the module pulls in bootstrap CSS which tweaks things like
global fonts, etc. which should be in alignment with the CSS used by the Twitter Theme and
may alter the appearance of other themes for pages where the bird sightings block is placed.

As admin visit the "Appearance" tab and click "Install new theme".  Paste the above URL into the
"Install from a URL" box and click "Install."  Then click "Enable newly added themes" and click
"Enable and set default" for the "Tweme" theme in the "DISABLED THEMES" area of the page.

## Drupal Modules
As admin vis the "Modules" tab and click "Install new module", paste a URL from the list below into
the "Install from a URL" box and click "Install."  Lather rinse and repeat once for each URL below.

- [http://ftp.drupal.org/files/projects/date-7.x-2.7.tar.gz](http://ftp.drupal.org/files/projects/date-7.x-2.7.tar.gz)
- [http://ftp.drupal.org/files/projects/features-7.x-2.0.tar.gz](http://ftp.drupal.org/files/projects/features-7.x-2.0.tar.gz)
- [http://ftp.drupal.org/files/projects/geolocation-7.x-1.4.tar.gz](http://ftp.drupal.org/files/projects/geolocation-7.x-1.4.tar.gz)
- [http://ftp.drupal.org/files/projects/restws-7.x-2.1.tar.gz](http://ftp.drupal.org/files/projects/restws-7.x-2.1.tar.gz)
- [http://ftp.drupal.org/files/projects/entity-7.x-1.5.tar.gz](http://ftp.drupal.org/files/projects/entity-7.x-1.5.tar.gz)
- [http://ftp.drupal.org/files/projects/restws_search_api-7.x-1.1.tar.gz](http://ftp.drupal.org/files/projects/restws_search_api-7.x-1.1.tar.gz)
- [http://ftp.drupal.org/files/projects/search_api-7.x-1.12.tar.gz](http://ftp.drupal.org/files/projects/search_api-7.x-1.12.tar.gz)
- [http://ftp.drupal.org/files/projects/strongarm-7.x-2.0.tar.gz](http://ftp.drupal.org/files/projects/strongarm-7.x-2.0.tar.gz)
- [http://ftp.drupal.org/files/projects/facetapi-7.x-1.4.tar.gz](http://ftp.drupal.org/files/projects/facetapi-7.x-1.4.tar.gz)

Clone this module into an appropriate 'modules' directory.
E.g.

```
% cd <drupal htdocs>/sites/default
% mkdir default
% cd default
% git clone https://github.com/adamspe/bird_sightings.git
```

Then run bower install

```
% cd bird_sightings
% bower install
```

If you don't have bower then visit [bower](http://bower.io/) and get it (will need Node, npm and Git as well since
bower is written in node).

Once you have both the dependencies and this module installed Drupal then visit the
"Modules" tab again and this time scroll down to the "Birding" section of the modules page.
You should see that all of its dependencies are listed and some wil be disabled and others enabled. 
Check the "ENABLED" checkbox next to the "Bird Sightings" module, scroll to the bottom and
click the "Save Configuration" button.  You'll be prompted because enabling this module will enable
a pile of others (those above).  Click "Continue."

When complete you'll be notified that the Date API needs you to configure some stuff so click the
provided "site timezone and first day of week settings" link, make any changes necessary and click
"Save configuration."  You'll now have lost the other link about date formats needing to be setup so
browse to "Configuration" and click "Date and time" in the "REGIONAL AND LANGUAGE" section.  Make
any changes you feel are important and click "Save configuration."  Even if you change nothing click
"Save configuration."  (**Note**: The "Short" format here is what is used on the recent bird sightings
view so you'll probably want to change that one, since the default is dumb).

OK, now you just need to create a home page and configure it.  If you visit the "Structure" tab you should
now see you have a new "Bird Sighting" Content type and two new Taxonomy Vocaularies.  If you visited Features
you'd see a new feature as well.  Installation also created a new view.  If you want to see/edit that you'll
need to re-visit the "Modules" page and enable the "Views UI" module.

Anyway back to getting the app on a page.  Create your home page (or any page I guess).
Visit "Content" and click the "Add content" link select "Basic page" and give it a title of 
"Bird Sightings".  On the "URL path settings" tab give it an aliase (e.g. home).
Don't give it any body just click "Save."

Make this new page the "home page."  Visit "Configuration" > "Site information" and enter the URL alias
you gave the empty page as the "Default front page" and click "Save configuration."

Now configure the new block.  Visit "Structure" > "Blocks."  Click the "configure" link next to the "Bird Sightings"
block and configure it such that it only shows up on the page you created and Save the changes.  Then move the
"Bird Sightings" block to the "Content" area.  The only other thing the page should contain is the "User login"
block in the "Sidebar first" area.  So either remove the Navigation/Search blocks or make it so they don't show
on your empty page.  When finished with that don't forget to scroll down to the bottom of the "Blocks" page and
click "Save blocks" so that things actually stick. (**Note:** I've had to do the moving of blocks repeatedly even after
clicking "Save blocks" since Drupal seems to lose some changes so you may just want to revisit the blocks config and
make sure your changes actually took, you may need to re-apply them).

**Issue:** _The module was intended to come with a pre-canned set of "Bird categories" but that's not coming along so you'll
need to create at least one category so that sightings can be created.  Visit "Structure" > "Taxonomy" and click the
"add terms" link next to the "Bird Categories" vocabulary.  Create a few categories (e.g. "Songbirds", "Shorebirds", "Ducks",
whatever)._

Now when you visit the home page you should see an empty map of the US displayed (no bird sightings yet).

Click the pencil icon with the popover text of "Add new sighting" to create a new sighting.  A picture isn't required
but give each sighting one anyway, this way they can show up in the carousel view.  (**Warning:** There seems to be a bug
in Drupal itself where the "Upload" button when adding files doesn't always work so when you add a picture it's best
to just pick the file but don't click the "Upload" button, the image will be added when the sighting is created).  The more
sightings you add (in more places) the more interesting the map will look, and the more stuff the carousel view will show.

## Icon overview
- Login/out: When not logged in will present the login form on the left side of the page (important that you put this block
on your home page or there won't be anything to show, if so visit /user/login).  Logout obviously logs you out.
- Image: Will present you with an image carousel of the 20 most recent sightings (not fancy here, will fetch 20 from the server
and show you those that have at least one image associated with them).
- Map: Will show the marker cluster map of recent sightings, you can pick from species and give it a # of days, each UI change
will refresh the data from the server and update the map.
- List: Will take you to the "Recent Bird Sightings" View/RSS feed where you can browse them as the Drupal view is configured to
present them.
- Pencil: Will allow yo uto create new sightings.

Hovering your mouse over each will give you popover text explaining what they are.

Users not logged in are obviously read-only.  Logged in users can create/edit their own sightings but not other's sightings
(aside from of course the admin user).

## Implementation Notes
The sightings logic is implemented in AngularJS with some Google Maps stuff.
It's implemented as a drupal block and expects the sight to have just (at least)
a main page with the bird sightings block added as its main content (all alone).
The login block should be placed on that single page in the left side bar and will
be hidden/shown by the app as necessary.

