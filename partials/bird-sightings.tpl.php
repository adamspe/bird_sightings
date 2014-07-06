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
<div ng-app="birdSightingsApp" id="bs-main-container">
  <div ng-controller="MenuCtrl">
  <ul class="nav nav-pills" id="bs-main-menu">
      <li ng-hide="userName"><a popover="Login" popover-trigger="mouseenter" popover-placement="top" href="javascript:toggleLogin();"><span class="glyphicon glyphicon-log-in"></span></a></li>
      <li ng-show="userName"><a popover="Logout" popover-trigger="mouseenter" popover-placement="top" href="user/logout"><span class="glyphicon glyphicon-log-out"></span></a></li>
      <li><a popover="Recent Bird Sightings Carousel" popover-trigger="mouseenter" popover-placement="top" href="#carousel"><span class="glyphicon glyphicon-picture"></span></a></li>
      <li><a popover="Recent Bird Sightings Map" popover-trigger="mouseenter" popover-placement="top" href="#map"><span class="glyphicon glyphicon-map-marker"></span></a></li>
      <li><a popover="Recent Bird Sightings Feed" popover-trigger="mouseenter" popover-placement="top" href="recent-bird-sightings"><span class="glyphicon glyphicon-list"></span></a></li>
      <li ng-show="userName"><a popover="Add New Sighting" popover-trigger="mouseenter" popover-placement="top" href="node/add/bird-sighting"><span class="glyphicon glyphicon-pencil"></span></a></li>
  </ul>
  <div ng-view></div>
</div>