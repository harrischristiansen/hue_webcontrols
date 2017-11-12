<? require('header.php'); ?>
	
<!-- Content -->
<main role="main" class="container">
	<div id="msgs"></div>
	<div class="jumbotron text-center lightControls">
		<h1>Brightness</h1><br>
		<a class="btn btn-success btn-xl" href="#" id="act_increase">Increase</a>
		<a class="btn btn-danger btn-xl" href="#" id="act_decrease">Decrease</a>
		<br><br>
		<a class="btn btn-danger btn-xl act_setBright" href="#" data-brightness="25">Low</a>
		<a class="btn btn-orange btn-xl act_setBright" href="#" data-brightness="65">Mid-Low</a>
		<a class="btn btn-warning btn-xl act_setBright" href="#" data-brightness="145">Mid</a>
		<a class="btn btn-teal btn-xl act_setBright" href="#" data-brightness="200">Mid-High</a>
		<a class="btn btn-success btn-xl act_setBright" href="#" data-brightness="255">High</a>
	</div>
	<div class="jumbotron text-center lightControls">
		<a class="btn btn-primary btn-xl" href="#" id="act_kitchen">Kitchen</a>
		<a class="btn btn-primary btn-xl" href="#" id="act_living">Living</a>
		<a class="btn btn-primary btn-xl" href="#" id="act_lamp">Lamp</a>
		<a class="btn btn-primary btn-xl" href="#" id="act_bath">Bath</a>
		<br><br>
		<? $currentLights = true; require('roomLayout.php'); ?>
	</div>
</main>

<? require('footer.php'); ?>