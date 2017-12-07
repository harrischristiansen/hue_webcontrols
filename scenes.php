<? require('header.php');

$red_high = "rgba(255,0,0,1)";
$red_low = "rgba(255,0,0,.25)";
$green_high = "rgba(0,255,0,1)";
$green_low = "rgba(0,255,0,.25)";
$blue_high = "rgba(0,0,255,1)";
$blue_low = "rgba(0,0,255,.25)";
$purple_high = "rgba(187,0,255,1)";
$purple_low = "rgba(187,0,255,.28)";
$white_blue_high = "rgba(225,226,251,1)";
$white_blue_low = "rgba(225,226,251,0.4)";
$white_warm_high = "rgba(249,187,187,1)";
$white_warm_low = "rgba(249,187,187,0.4)";
$light_off = "#000001";

$scenes = [
	"Normal" => [
		"sinkLight" =>		["circleLight",	$white_blue_high],
		"ovenLight" =>		["circleLight",	$white_blue_high],
		"barLight" =>		["circleLight",	$white_blue_high],
		"fridgeLight" => 	["circleLight",	$red_high],
		"midLight" =>		["circleLight",	$white_blue_high],
		"couchLight" => 	["circleLight",	$white_warm_low],
		"tvLight" =>		["circleLight",	$white_blue_high],
		"windowLight" => 	["circleLight",	$white_warm_low],
		"wallLight" =>		["circleLight",	$blue_high],
		//"tableLight" => 	["squareLight",	$red_high],
		"deskLight" =>		["rectLight",	$purple_high],
		"lampTop" =>		["circleLight",	$white_blue_high],
		"lampMid" =>		["circleLight",	$white_blue_high],
		"lampBtm" =>		["circleLight",	$white_warm_high],
		"bathLight" =>		["circleLight",	$white_blue_high],
		"guestLight" => 	["circleLight",	$white_blue_high],
	],
	"Blue" => [
		"sinkLight" =>		["circleLight",	$blue_high],
		"ovenLight" =>		["circleLight",	$blue_high],
		"barLight" =>		["circleLight",	$purple_high],
		"fridgeLight" => 	["circleLight",	$blue_high],
		"midLight" =>		["circleLight",	$blue_high],
		"couchLight" => 	["circleLight",	$blue_low],
		"tvLight" =>		["circleLight",	$blue_high],
		"windowLight" => 	["circleLight",	$purple_low],
		"wallLight" =>		["circleLight",	$green_high],
		//"tableLight" => 	["squareLight",	$green_high],
		"deskLight" =>		["rectLight",	$green_high],
		"lampTop" =>		["circleLight",	$blue_high],
		"lampMid" =>		["circleLight",	$blue_high],
		"lampBtm" =>		["circleLight",	$purple_high],
		"bathLight" =>		["circleLight",	$blue_high],
		"guestLight" => 	["circleLight",	$blue_high],
	],
	"Movie" => [
		"sinkLight" =>		["circleLight",	$light_off],
		"ovenLight" =>		["circleLight",	$light_off],
		"barLight" =>		["circleLight",	$light_off],
		"fridgeLight" => 	["circleLight",	$red_low],
		"midLight" =>		["circleLight",	$light_off],
		"couchLight" => 	["circleLight",	$light_off],
		"tvLight" =>		["circleLight",	$light_off],
		"windowLight" => 	["circleLight",	$light_off],
		"wallLight" =>		["circleLight",	$light_off],
		//"tableLight" => 	["squareLight",	$light_off],
		"deskLight" =>		["rectLight",	$light_off],
		"lampTop" =>		["circleLight",	$red_low],
		"lampMid" =>		["circleLight",	$light_off],
		"lampBtm" =>		["circleLight",	$purple_low],
		"bathLight" =>		["circleLight",	$red_high],
		"guestLight" => 	["circleLight",	$red_high],
	],
	"Night" => [
		"sinkLight" =>		["circleLight",	$light_off],
		"ovenLight" =>		["circleLight",	$light_off],
		"barLight" =>		["circleLight",	$light_off],
		"fridgeLight" => 	["circleLight",	$light_off],
		"midLight" =>		["circleLight",	$light_off],
		"couchLight" => 	["circleLight",	$light_off],
		"tvLight" =>		["circleLight",	$light_off],
		"windowLight" => 	["circleLight",	$light_off],
		"wallLight" =>		["circleLight",	$light_off],
		//"tableLight" => 	["squareLight",	$light_off],
		"deskLight" =>		["rectLight",	$light_off],
		"lampTop" =>		["circleLight",	$red_low],
		"lampMid" =>		["circleLight",	$light_off],
		"lampBtm" =>		["circleLight",	$light_off],
		"bathLight" =>		["circleLight",	$red_high],
		"guestLight" => 	["circleLight",	$red_high],
	],
];

?>
	
<!-- Content -->
<main role="main" class="container">
	<div id="msgs"></div>
	<div class="jumbotron text-center lightControls">
		<h1>Scenes</h1><br>
		<div class="row">
			<? foreach ($scenes as $title => $layout) {
				echo '<div class="col-12 col-lg-6">';
				require('roomLayout.php');
				echo '</div>';
			}
			?>
		</div>
	</div>
</main>

<? require('footer.php'); ?>
