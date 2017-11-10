/*
	@ Harris Christiansen (Harris@HarrisChristiansen.com)
	November 2017
	Project: Hue Web Controls
*/


var	colors = colors || window.colors,
	hue = hue || window.hue,
	IPAddress = '10.3.0.158',
	connectedLampCount = 3,
	APIKey = 'd5orxbetHKF46FCV1wBmnFTVNSkGQWMSjwNOHu2i';

var windowLight = 5, couch = 6, wall = 7, mid = 8, tv = 9, strip = 18
	lamp_mid = 10, lamp_top = 11, lamp_btm = 12,
	bath_main = 16, bath_guest = 17,
	fridge = 4, sink = 19, oven = 20, bar = 21;
var kitchen = [fridge, sink, oven, bar],
	living = [windowLight, couch, wall, mid, tv, strip],
	guest = [lamp_mid, lamp_top, lamp_btm],
	bath = [bath_main, bath_guest];
var color_palette = ['#FF0000', '#00FF00', '#0000FF']

$(document).ready(function() {
	hue.setIpAndApiKey(IPAddress, APIKey);
	displayMessage("Connected!");
});
$("#act_on").click(function() {
	hue.turnOnAll();
	displayMessage("Lights On!");
});
$("#act_off").click(function() {
	hue.turnOffAll();
	displayMessage("Lights Off!");
});
$("#act_flash").click(function() {
	hue.turnOffAll();
	setTimeout(function(){ 
		hue.turnOnAll();
	}, 1100);
	displayMessage("Lights Flashed!");
});
$("#act_kitchen").spectrum({
	chooseText: "Set",
	showPalette: true,
	palette: color_palette,
	change: function(color) {
		setRoom(kitchen, color.toHexString().substring(1, 7));
		displayMessage("Set kitchen to "+color.toHexString());
		$("#act_kitchen").css('background-color', color.toHexString());
	}
});
$("#act_living").spectrum({
	chooseText: "Set",
	showPalette: true,
	palette: color_palette,
	change: function(color) {
		setRoom(living, color.toHexString().substring(1, 7));
		displayMessage("Set living room to "+color.toHexString());
		$("#act_living").css('background-color', color.toHexString());
	}
});

$("#act_decrease").click(function() {
	hue.dimAll(50);
	displayMessage("Brightness decreased!");
});
$("#act_increase").click(function() {
	hue.brightenAll(50);
	displayMessage("Brightness increased!");
});
$(".act_setBright").click(function(evt) {
	brightness = parseInt(evt.target.getAttribute('data-brightness'));
	hue.setAllBrightness(brightness);
	displayMessage("Brightness set!");
});

function displayMessage(msg, isFailure=false) {
	if (isFailure) {
		$('<div class="alert alert-danger" role="alert">'+msg+"</div>").appendTo('#msgs').delay(2200).slideUp(300);
	} else {
		$('<div class="alert alert-success" role="alert">'+msg+"</div>").appendTo('#msgs').delay(2200).slideUp(300);
	}
}

function setRoom(room, color) {
	for (var i in room) {
		hue.setColor(room[i], color)
	}
}