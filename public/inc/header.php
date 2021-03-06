<?php include_once('../config.php'); ?>
<!DOCTYPE html>
<html class="no-js">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /><?php
    if ($environment === 'production') { echo '<meta name="robots" content="index, follow">'; }
    else { echo '<meta name="robots" content="noindex, nofollow">'; } ?>
    <title><?php echo theTitle(); ?></title>
    <link rel="shortcut icon" href="img/favicon.png" />
    <meta name="description" content="<?php echo theDescription(); ?>">
    <link rel="stylesheet" href="<?php echo 'style/screen.css?' . filemtime('style/screen.css'); ?>">
    <script type='text/javascript' src='//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js'></script>
    <?php echo gtmHead(); ?>
  </head>
  <body>
    <?php echo gtmBody(); ?>
