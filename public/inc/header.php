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
    <link rel="stylesheet" href="style/screen.css">
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <script type='text/javascript' src='js/modernizr.min.js'></script>
    <script type='text/javascript' src='js/respond.min.js'></script>
    <?php if($environment === 'production') { ?>
    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', '<?php echo $google_analytics; ?>', '<?php echo $hostname; ?>');
      ga('send', 'pageview');
    </script>
    <?php } ?>
  </head>
  <body>