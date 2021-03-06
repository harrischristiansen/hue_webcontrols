<? require('header.php'); ?>
	
<!-- Content -->
<main role="main" class="container">
	<div id="msgs"></div>
	<div class="jumbotron text-center lightControls">
		<h1>Brightness</h1><br>
		<a class="btn btn-danger btn-xl act_setBright" href="#" data-brightness="25">Min</a>
		<a class="btn btn-orange btn-xl" href="#" id="act_decrease">Decrease</a>
		<a class="btn btn-teal btn-xl" href="#" id="act_increase">Increase</a>
		<a class="btn btn-success btn-xl act_setBright" href="#" data-brightness="255">Max</a>
	</div>
	<div class="jumbotron text-center lightControls">
		<a class="btn btn-primary btn-xl" href="#" id="act_family">Family</a>
		<a class="btn btn-primary btn-xl" href="#" id="act_living">Living</a>
		<a class="btn btn-primary btn-xl" href="#" id="act_midbed">Game Room</a>
		<br><br>
		<? $currentLights = true; require('roomLayout.php'); ?>
	</div>
</main>

<? require('footer.php'); ?>