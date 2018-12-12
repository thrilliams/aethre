<?php
  if(!isset($IG_ROOT)) $IG_ROOT = '';
  $IG_GAME_CACHE = isset($_GET['nocache']) ? '?'.time() : '';
  if(!isset($IG_WIDTH)) $IG_WIDTH = isset($_GET['sd']) ? 480 : 568;
  $IG_HEIGHT = 320;
  if(!isset($IG_KEEP_WINDOW_FOCUS)) $IG_KEEP_WINDOW_FOCUS = isset($_GET['keepWindowFocus']) ? true : false;
  if(!isset($IG_HIDE_DEBUG)) $IG_HIDE_DEBUG = isset($_GET['hideDebug']) ? true : false;
  if(!isset($IG_GAME_SCALE)) $IG_GAME_SCALE = isset($_GET['scale']) ? $_GET['scale'] : 2;
  if(!isset($IG_SCREEN_MODE_OVERRIDE)) $IG_SCREEN_MODE_OVERRIDE = isset($_GET['screenMode']) ? $_GET['screenMode'] : null;
  if(!isset($IG_WEB_AUDIO_BGM)) $IG_WEB_AUDIO_BGM = isset($_GET['webAudioBGM']) ? true : false;
  if(!isset($IG_GAME_FPS)) $IG_GAME_FPS = isset($_GET['fps']) ? $_GET['fps'] : 60;
  if(!isset($IG_IGNORE_OPTIONS)) $IG_IGNORE_OPTIONS = isset($_GET['ignoreOptions']) ? true : false;
  if(!isset($IG_LVL)) $IG_LVL = isset($_GET['lvl']) ? $_GET['lvl'] : 0;
  if(!isset($IG_PARTY)) $IG_PARTY = isset($_GET['party']) ? $_GET['party'] : "";
  if(!isset($IG_PLOT)) $IG_PLOT = isset($_GET['plot']) ? $_GET['plot'] : 0;
?>
<script>
  <?php if(isset($IG_MAP)){ ?>var LOAD_LEVEL_ON_GAME_START = "<?= $IG_MAP; ?>"; <?php } ?>
  <?php if(isset($IG_MARKER)){ ?>var MARKER_ON_GAME_START = "<?= $IG_MARKER; ?>"; <?php } ?>
  var IG_GAME_SCALE = <?= $IG_GAME_SCALE ?>;
  var IG_GAME_CACHE = "<?= $IG_GAME_CACHE ?>";
  var IG_KEEP_WINDOW_FOCUS = "<?= $IG_KEEP_WINDOW_FOCUS ?>";
  var IG_ROOT = "<?= $IG_ROOT ?>";
  var IG_LANG = <?= isset($IG_LANG) ? '"'.$IG_LANG.'"' : "undefined" ?>;
  var IG_WIDTH = <?= $IG_WIDTH ?>;
  var IG_HEIGHT = <?= $IG_HEIGHT ?>;
  var IG_HIDE_DEBUG = <?= $IG_HIDE_DEBUG ? 'true' : 'false' ?>;
  var IG_SCREEN_MODE_OVERRIDE = "<?= $IG_SCREEN_MODE_OVERRIDE ?>";
  var IG_WEB_AUDIO_BGM = <?= $IG_WEB_AUDIO_BGM ? 'true' : 'false'?>;
  var IG_GAME_FPS = <?= $IG_GAME_FPS ?>;
  var IG_LVL = <?= $IG_LVL ?>;
  var IG_PLOT = <?= $IG_PLOT ?>;
  var IG_PARTY = "<?= $IG_PARTY ?>";
  var IG_IGNORE_OPTIONS = <?= $IG_IGNORE_OPTIONS ? 'true' : 'false' ?>;
</script>
