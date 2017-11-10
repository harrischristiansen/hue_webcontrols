<? require('header.php');

$scenes = [
	"Movie" => [
		"sinkLight" =>		["circleLight",	"#FF0000"],
		"ovenLight" =>		["circleLight",	"#000001"],
		"barLight" =>		["circleLight",	"#000001"],
		"fridgeLight" => 	["circleLight",	"#000001"],
		"midLight" =>		["circleLight",	"#000001"],
		"couchLight" => 	["circleLight",	"#000001"],
		"tvLight" =>		["circleLight",	"#000001"],
		"windowLight" => 	["circleLight",	"#000001"],
		"wallLight" =>		["circleLight",	"#000001"],
		//"tableLight" => 	["squareLight",	"#000001"],
		"deskLight" =>		["rectLight",	"#000001"],
		"lampTop" =>		["circleLight",	"#000001"],
		"lampMid" =>		["circleLight",	"#000001"],
		"lampBtm" =>		["circleLight",	"#FF0000"],
		"bathLight" =>		["circleLight",	"#FF0000"],
		"guestLight" => 	["circleLight",	"#FF0000"],
	],
	"Normal" => [
		"sinkLight" =>		["circleLight",	"#e1e2fb"],
		"ovenLight" =>		["circleLight",	"#e1e2fb"],
		"barLight" =>		["circleLight",	"#e1e2fb"],
		"fridgeLight" => 	["circleLight",	"#FF0000"],
		"midLight" =>		["circleLight",	"#e1e2fb"],
		"couchLight" => 	["circleLight",	"#f9bbbb"],
		"tvLight" =>		["circleLight",	"#e1e2fb"],
		"windowLight" => 	["circleLight",	"#f9bbbb"],
		"wallLight" =>		["circleLight",	"#0000FF"],
		//"tableLight" => 	["squareLight",	"#e1e2fb"],
		"deskLight" =>		["rectLight",	"#bb00ff"],
		"lampTop" =>		["circleLight",	"#e1e2fb"],
		"lampMid" =>		["circleLight",	"#e1e2fb"],
		"lampBtm" =>		["circleLight",	"#f9bbbb"],
		"bathLight" =>		["circleLight",	"#e1e2fb"],
		"guestLight" => 	["circleLight",	"#e1e2fb"],
	],
	"Blue" => [
		"sinkLight" =>		["circleLight",	"#0000FF"],
		"ovenLight" =>		["circleLight",	"#0000FF"],
		"barLight" =>		["circleLight",	"#bb00ff"],
		"fridgeLight" => 	["circleLight",	"#00FF00"],
		"midLight" =>		["circleLight",	"#0000FF"],
		"couchLight" => 	["circleLight",	"#0000FF"],
		"tvLight" =>		["circleLight",	"#0000FF"],
		"windowLight" => 	["circleLight",	"#bb00ff"],
		"wallLight" =>		["circleLight",	"#00FF00"],
		//"tableLight" => 	["squareLight",	"#00FF00"],
		"deskLight" =>		["rectLight",	"#00FF00"],
		"lampTop" =>		["circleLight",	"#0000FF"],
		"lampMid" =>		["circleLight",	"#0000FF"],
		"lampBtm" =>		["circleLight",	"#bb00ff"],
		"bathLight" =>		["circleLight",	"#0000FF"],
		"guestLight" => 	["circleLight",	"#0000FF"],
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
