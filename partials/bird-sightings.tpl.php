<?php
/**
 * @file
 * bird-sightings template to render a block
 */
?>
<script language="JavaScript">
function toggleLogin() {
    (function ($) {
        $('#sidebar-first').toggle(500);
    })(jQuery);
}
</script>
<div ng-app="birdSightingsApp">
    <div ng-controller="SightingsCtrl">
        <div style="height: 500px; width: 800px;">
        <aside ng-show="sightings.length > 0">
            <carousel interval="carousel.interval">
              <slide ng-repeat="sighting in sightings" active="slide.active">
                <a href="{{sighting.url}}"><img ng-src="{{sighting.image}}" style="margin:auto; height:500px;"></a>
                <div class="carousel-caption">
                  <h4>{{sighting.title}}</h4>
                  <p>{{sighting.species}} ({{sighting.category}})</p>
                </div>
              </slide>
            </carousel>
        </aside>
      </div>
        <ul class="nav nav-pills">
            <li ng-hide="userName"><a popover="LogIn" popover-trigger="mouseenter" popover-placement="bottom" href="javascript:toggleLogin();"><span class="glyphicon glyphicon-user"></span></a></li>
            <li><a popover="Recent Bird Sightings Feed" popover-trigger="mouseenter" popover-placement="bottom" href="recent-bird-sightings"><span class="glyphicon glyphicon-list"></span></a></li>
            <li ng-show="userName"><a popover="Add New Sighting" popover-trigger="mouseenter" popover-placement="bottom" href="node/add/bird-sighting"><span class="glyphicon glyphicon-pencil"></span></a></li>
            <li ng-show="userName" ng-class="{active: carousel.mine}"><a popover="{{carousel.minePopover}}" popover-trigger="mouseenter" popover-placement="bottom" ng-click="justMine()"><span class="glyphicon glyphicon-picture"></a></li>
        </ul>
    </div>
</div>