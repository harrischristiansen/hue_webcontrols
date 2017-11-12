<?
$sceneID = bin2hex(openssl_random_pseudo_bytes(10));

$DEFAULT_LAYOUT = [
	"sinkLight" =>		["circleLight",	"#0000FF"],
	"ovenLight" =>		["circleLight",	"#0000FF"],
	"barLight" =>		["circleLight",	"#0000FF"],
	"fridgeLight" => 	["circleLight",	"#0000FF"],
	"midLight" =>		["circleLight",	"#0000FF"],
	"couchLight" => 	["circleLight",	"#0000FF"],
	"tvLight" =>		["circleLight",	"#0000FF"],
	"windowLight" => 	["circleLight",	"#0000FF"],
	"wallLight" =>		["circleLight",	"#0000FF"],
	//"tableLight" => 	["squareLight",	"#0000FF"],
	"deskLight" =>		["rectLight",	"#0000FF"],
	"lampTop" =>		["circleLight",	"#0000FF"],
	"lampMid" =>		["circleLight",	"#0000FF"],
	"lampBtm" =>		["circleLight",	"#0000FF"],
	"bathLight" =>		["circleLight",	"#0000FF"],
	"guestLight" => 	["circleLight",	"#0000FF"],
];
?>

<div class="roomLayout <? if (isset($currentLights)) { echo 'currentLights'; } ?>" id="<? echo $sceneID; ?>">
	<? if (!isset($layout)) {
		$layout = $DEFAULT_LAYOUT;
	}
	foreach ($layout as $classname => $details) {
		echo '<div class="'.$details[0].' '.$classname.'" style="background-color: '.$details[1].'"></div>';
	}
	?>
</div>
<? if (strlen($title) > 1) { ?>
<br>
<button class="btn btn-info setScene" data-scene="<? echo $sceneID; ?>"><? echo $title; ?></button>
<? } ?>
<br><br>