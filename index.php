<? require('header.php'); ?>
	
<!-- Content -->
<main role="main" class="container">
	<div class="jumbotron text-center">
		<h1>Brightness</h1><br>
		<a class="btn btn-success btn-xl" href="#" id="act_incease">Increase</a>
		<a class="btn btn-danger btn-xl" href="#" id="act_decrease">Decrease</a>
		<br><br>
		<a class="btn btn-danger btn-xl act_setBright" href="#" data-brightness="40">Low</a>
		<a class="btn btn-warning btn-xl act_setBright" href="#" data-brightness="50">Mid</a>
		<a class="btn btn-success btn-xl act_setBright" href="#" data-brightness="255">High</a>
	</div>
	<div class="jumbotron text-center">
		<a class="btn btn-primary btn-xl" href="#" id="act_kitchen">Kitchen</a>
		<a class="btn btn-primary btn-xl" href="#" id="act_living">Living</a>
	</div>
	<div id="msgs"></div>
</main>

<? require('footer.php'); ?>