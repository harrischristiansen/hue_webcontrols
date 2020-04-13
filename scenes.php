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
$white_mid_high = "rgba(240,200,200,1)";
$white_warm_high = "rgba(249,187,187,1)";
$white_warm_low = "rgba(249,187,187,0.4)";
$light_off = "#000001";

$scenes = [
	"Normal" => [
		"midbed_1" => ["midbed_1", $white_blue_high],
		"midbed_2" => ["midbed_2", $white_blue_high],
		"midbed_3" => ["midbed_3", $white_blue_high],
		"tv_cabinet" => ["tv_cabinet", $white_blue_high],
		"glass_lamp" => ["glass_lamp", $white_blue_high],
		"shelve_lamp" => ["shelve_lamp", $white_blue_high],
		"glass_cabinet" => ["glass_cabinet", $white_blue_high],
		"bloom_1" => ["bloom_1", $white_blue_high],
		"bloom_2" => ["bloom_2", $white_blue_high],
		"bloom_3" => ["bloom_3", $white_blue_high],
		"play_1" => ["play_1", $white_blue_high],
		"play_2" => ["play_2", $white_blue_high],
		"play_3" => ["play_3", $white_blue_high],
		"go_1" => ["go_1", $white_blue_high],
		"go_2" => ["go_2", $white_blue_high],
		"go_3" => ["go_3", $white_blue_high],
	],
	"Blue" => [
		"midbed_1" => ["midbed_1", $blue_high],
		"midbed_2" => ["midbed_2", $blue_high],
		"midbed_3" => ["midbed_3", $blue_high],
		"tv_cabinet" => ["tv_cabinet", $blue_high],
		"glass_lamp" => ["glass_lamp", $blue_high],
		"shelve_lamp" => ["shelve_lamp", $blue_high],
		"glass_cabinet" => ["glass_cabinet", $blue_high],
		"bloom_1" => ["bloom_1", $blue_high],
		"bloom_2" => ["bloom_2", $blue_high],
		"bloom_3" => ["bloom_3", $blue_high],
		"play_1" => ["play_1", $blue_high],
		"play_2" => ["play_2", $blue_high],
		"play_3" => ["play_3", $blue_high],
		"go_1" => ["go_1", $blue_high],
		"go_2" => ["go_2", $blue_high],
		"go_3" => ["go_3", $blue_high],
	]
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
