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
var lights = [sink, oven, bar, fridge, mid, couch, tv, windowLight, strip, wall, lamp_top, lamp_mid, lamp_btm, bath_main, bath_guest]
	kitchen = [sink, oven, bar, fridge],
	living = [mid, couch, tv, windowLight, strip, wall],
	lamp = [lamp_top, lamp_mid, lamp_btm],
	bath = [bath_main, bath_guest];
var lightElements = {
	".sinkLight": [sink, "sink"],
	".ovenLight": [oven, "oven"],
	".barLight": [bar, "bar"],
	".fridgeLight": [fridge, "fridge"],
	".midLight": [mid, "middle"],
	".couchLight": [couch, "couch"],
	".tvLight": [tv, "tv"],
	".windowLight": [windowLight, "window"],
	".wallLight": [wall, "wall"],
	".deskLight": [strip, "tv desk"],
	".lampTop": [lamp_top, "lamp top"],
	".lampMid": [lamp_mid, "lamp middle"],
	".lampBtm": [lamp_btm, "lamp bottom"],
	".bathLight": [bath_main, "main bathroom"],
	".guestLight": [bath_guest, "guest bathroom"],
};
var color_palette = ['#FF0000', '#904000', '#ffb400', '#ff00b0', '#bb00ff', '#0000FF', '#00FF00', '#8183ff', '#e1e2fb', '#f9bbbb', '#f9bbf1']

$(document).ready(function() {
	hue.setIpAndApiKey(IPAddress, APIKey);
	displayMessage("Connected!");
});

// ================ Nav Bar ============== //

$("#act_on").click(function() {
	hue.turnOnAll();
	displayMessage("Lights On!");
});
$("#act_off").click(function() {
	hue.turnOffAll();
	displayMessage("Lights Off!");
});
$("#act_flash").click(function() {
	displayMessage("Lights Flashed!");
	for (var i in lights) {
		setTimeout(flashLight, 260*i, lights[i]);
	}
});

// ================ Brightness ============== //

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

// ================ Light Assignment ============== //

function setRoom(room, color) {
	for (var i in room) {
		hue.setColor(room[i], color);
		setElementColor(room[i], "#"+color);
	}
}

function setColor(color) {
	lightClass = $(this).attr("class").split(' ')[1];
	light = lightElements["."+lightClass];
	hue.setColor(light[0], color.toHexString().substring(1, 7));
	displayMessage("Set "+light[1]+" light to "+color.toHexString());
	$(this).css('background-color', color.toHexString());
}

function flashLight(light) {
	hue.turnOff(light);
	flashLightElement(light);
	setTimeout(function() {
		hue.turnOn(light);
	}, 1200);
}

// ================ HTML Light Element Assignment ============== //

function getElementClass(light) {
	var classname = "";
	for (var i in lightElements) {
		if (lightElements[i][0] == light) {
			classname = i;
			break;
		}
	}
	return classname
}

function setElementColor(light, color) {
	if (Number.isInteger(light)) {
		light = getElementClass(light)
	}

	$(light).css('background-color', color);
}

function flashLightElement(light) {
	if (Number.isInteger(light)) {
		light = getElementClass(light)
	}

	bgcolor = $(light).css('background-color');
	setElementColor(light, '#000000');
	setTimeout(function() {
		setElementColor(light, bgcolor);
	}, 1400);
}

// ================ Color Pickers ============== //

$("#act_kitchen").spectrum({
	chooseText: "Set",
	showPalette: true,
	palette: color_palette,
	change: function(color) {
		setRoom(kitchen, color.toHexString().substring(1, 7));
		displayMessage("Set kitchen lights to "+color.toHexString());
		$("#act_kitchen").css('background-color', color.toHexString());
	}
});
$("#act_living").spectrum({
	chooseText: "Set",
	showPalette: true,
	palette: color_palette,
	change: function(color) {
		setRoom(living, color.toHexString().substring(1, 7));
		displayMessage("Set living room lights to "+color.toHexString());
		$("#act_living").css('background-color', color.toHexString());
	}
});
$("#act_lamp").spectrum({
	chooseText: "Set",
	showPalette: true,
	palette: color_palette,
	change: function(color) {
		setRoom(lamp, color.toHexString().substring(1, 7));
		displayMessage("Set lamp lights to "+color.toHexString());
		$("#act_lamp").css('background-color', color.toHexString());
	}
});
$("#act_bath").spectrum({
	chooseText: "Set",
	showPalette: true,
	palette: color_palette,
	change: function(color) {
		setRoom(bath, color.toHexString().substring(1, 7));
		displayMessage("Set bathroom lights to "+color.toHexString());
		$("#act_bath").css('background-color', color.toHexString());
	}
});

for (var i in lightElements) {
	$(i).spectrum({
		chooseText: "Set",
		showPalette: true,
		palette: color_palette,
		change: setColor,
	});
}

// ================ Display Messages ============== //

function displayMessage(msg, isFailure=false) {
	if (isFailure) {
		$('<div class="alert alert-danger" role="alert">'+msg+"</div>").appendTo('#msgs').delay(2200).slideUp(300);
	} else {
		$('<div class="alert alert-success" role="alert">'+msg+"</div>").appendTo('#msgs').delay(2200).slideUp(300);
	}
}