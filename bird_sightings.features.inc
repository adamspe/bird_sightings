<?php
/**
 * @file
 * bird_sightings.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function bird_sightings_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function bird_sightings_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function bird_sightings_node_info() {
  $items = array(
    'bird_sighting' => array(
      'name' => t('Bird Sighting'),
      'base' => 'node_content',
      'description' => t('Record of a bird sighting.'),
      'has_title' => '1',
      'title_label' => t('Bird Sighting'),
      'help' => '',
    ),
  );
  return $items;
}
