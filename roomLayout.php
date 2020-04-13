<?
$sceneID = bin2hex(openssl_random_pseudo_bytes(10));

$DEFAULT_LAYOUT = [
	"midbed_1" => ["circleLight", "#0000FF"],
	"midbed_2" => ["circleLight", "#0000FF"],
	"midbed_3" => ["circleLight", "#0000FF"],
	"tv_cabinet" => ["squareLight", "#0000FF"],
	"glass_lamp" => ["circleLight", "#0000FF"],
	"shelve_lamp" => ["squareLight", "#0000FF"],
	"glass_cabinet" => ["squareLight", "#0000FF"],
	"bloom_1" => ["circleLight", "#0000FF"],
	"bloom_2" => ["circleLight", "#0000FF"],
	"bloom_3" => ["circleLight", "#0000FF"],
	"play_1" => ["circleLight", "#0000FF"],
	"play_2" => ["circleLight", "#0000FF"],
	"play_3" => ["circleLight", "#0000FF"],
	"go_1" => ["circleLight", "#0000FF"],
	"go_2" => ["circleLight", "#0000FF"],
	"go_3" => ["circleLight", "#0000FF"],
];

$CLASSNAME_TO_LIGHTNAME = [
	"midbed_1" => "Midbed Lamp Top",
	"midbed_2" => "Midbed Lamp Middle",
	"midbed_3" => "Midbed Lamp Bottom",
	"tv_cabinet" => "TV Cabinet",
	"glass_lamp" => "Glass Lamp",
	"shelve_lamp" => "Shelve Lamp",
	"glass_cabinet" => "Glass Cabinet",
	"bloom_1" => "Bloom 1",
	"bloom_2" => "Bloom 2",
	"bloom_3" => "Bloom 3",
	"play_1" => "Play 1",
	"play_2" => "Play 2",
	"play_3" => "Play 3",
	"go_1" => "Go 1",
	"go_2" => "Go 2",
	"go_3" => "Go 3",
];

?>

<div class="roomLayout <? if (isset($currentLights)) { echo 'currentLights'; } ?> <? if (strlen($title) > 1) { echo 'sceneMap'; } ?>" id="<? echo $sceneID; ?>">
	<? if (!isset($layout)) {
		$layout = $DEFAULT_LAYOUT;
	}
	foreach ($layout as $classname => $details) {
		echo '<div class="'.$details[0].' '.$classname.'" style="background-color: '.$details[1].'" data-initial-color="'.$details[1].'" title="'.$CLASSNAME_TO_LIGHTNAME[$classname].'"></div>';
	}
	?>
</div>
<? if (strlen($title) > 1) { ?>
<br>
<button class="btn btn-info setScene" data-scene="<? echo $sceneID; ?>"><? echo $title; ?></button>
<? } ?>
<br><br>