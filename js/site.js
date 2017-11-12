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
var color_palette = ['transparent', '#000001', '#FF0000', '#904000', '#ffb400', '#ff00b0', '#bb00ff', '#0000FF', '#00FF00', '#8183ff', '#e1e2fb', '#f9bbbb', '#f9bbf1']

$(document).ready(function() {
	hue.setIpAndApiKey(IPAddress, APIKey);
	hue.setLightIDs(lights);
	displayMessage("Connected!");

	// Load Current Light Colors
	loadCurrentLights();
});

// ================ Nav Bar ============== //

$("#act_on").click(function() {
	hue.turnOnAll();
	$(".lightControls").slideDown();
	displayMessage("Lights On!");
});
$("#act_off").click(function() {
	hue.turnOffAll();
	$(".lightControls").slideUp();
	displayMessage("Lights Off!");
});
var isFlashing = false;
$("#act_flash").click(function() {
	if (isFlashing) {
		return false;
	}
	displayMessage("Lights Flashed!");
	isFlashing = true;
	for (var i in lights) {
		setTimeout(flashLight, 260*i, lights[i]);
	}
	setTimeout(function() {
		isFlashing = false;
	}, 260*lights.length + 2000);
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

// ================ Scenes ============== //

function setRoom(room, color) {
	for (var i in room) {
		setLightColor(lightElements[getElementClass(room[i])], color);
		setElementColor(room[i], "#"+color);
	}
}

$(".setScene").click(function(evt) {
	var sceneID = evt.target.getAttribute('data-scene');
	var sceneLights = $("#"+sceneID).children();
	for (var i in sceneLights) {
		if (i == "length") {
			break;
		}
		color = hexc(sceneLights[i].style.backgroundColor);
		classname = "."+sceneLights[i].className.split(' ')[1];
		light = lightElements[classname];
		setLightColor(light, color);
	}
	displayMessage("Set scene: "+evt.target.text);
});
function setScene(room, color) {
	for (var i in room) {
		setLightColor(lightElements[getElementClass(room[i])], color);
		setElementColor(room[i], "#"+color);
	}
}

// ================ Light Status ============== //

function loadCurrentLights() {
	var lights = $(".currentLights").children();
	for (var i in lights) {
		if (i == "length") {
			break;
		}
		classname = "."+lights[i].className.split(' ')[1];
		light = lightElements[classname];
		color = hue.getColorHex(light[0]);
		console.log("Loaded light "+light+" with color "+color);
		$(".currentLights > "+classname).css("background-color", "#"+color);
	}
}

// ================ Light Assignment ============== //

function setColor(color) {
	classname = "."+$(this).attr("class").split(' ')[1];
	light = lightElements[classname];

	setLightColor(light, color, $(this));
	setElementColor($(this), color.toHexString());
}

function setLightColor(light, color, element=null) {
	if (color._a == 0) {
		return false;
	}
	color_hex = "";
	if (typeof color === 'string' || color instanceof String) {
		color_hex = color;
	} else {
		color_hex = color.toHexString()
	}

	if (color_hex == "#000000" || color_hex == "#000001") {
		hue.turnOff(light[0]);
	} else {
		if (element != null) {
			bgcolor = element.css('background-color');
			if ((bgcolor == "rgb(0, 0, 0)" || bgcolor == "rgb(0, 0, 1)")) {
				hue.turnOn(light[0]);
			}
		} else {
			hue.turnOn(light[0]);
		}
		setTimeout(setLightToHex, 100, light[0], color_hex.substring(1, 7), Math.ceil(color._a*255));
		if (element != null) {
			displayMessage("Set "+light[1]+" light to "+color_hex);
		}
	}
}

function setLightToHex(lightID, colorHex, brightness=null) {
	hue.setColor(lightID, colorHex);
	if (brightness != null && brightness > 1 && brightness < 254) {
		console.log("Set Brightness: "+brightness);
		hue.setBrightness(lightID, brightness);
	}
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

	if (typeof light === 'string' || light instanceof String) {
		$(light).css('background-color', color);
	} else {
		light.css('background-color', color);
	}
}

function flashLightElement(light) {
	if (Number.isInteger(light)) {
		light = getElementClass(light)
	}

	bgcolor = $(light).css('background-color');
	setElementColor(light, '#000000');
	setTimeout(setElementColor, 1400, light, bgcolor);
}

// ================ Color Pickers ============== //

$("#act_kitchen").spectrum({
	chooseText: "Set",
	showAlpha: true,
	showPalette: true,
	palette: color_palette,
	change: function(color) {
		setRoom(kitchen, color);
		displayMessage("Set kitchen lights to "+color.toHexString());
		$("#act_kitchen").css('background-color', color.toHexString());
	}
});
$("#act_living").spectrum({
	chooseText: "Set",
	showAlpha: true,
	showPalette: true,
	palette: color_palette,
	change: function(color) {
		setRoom(living, color);
		displayMessage("Set living room lights to "+color.toHexString());
		$("#act_living").css('background-color', color.toHexString());
	}
});
$("#act_lamp").spectrum({
	chooseText: "Set",
	showAlpha: true,
	showPalette: true,
	palette: color_palette,
	change: function(color) {
		setRoom(lamp, color);
		displayMessage("Set lamp lights to "+color.toHexString());
		$("#act_lamp").css('background-color', color.toHexString());
	}
});
$("#act_bath").spectrum({
	chooseText: "Set",
	showAlpha: true,
	showPalette: true,
	palette: color_palette,
	change: function(color) {
		setRoom(bath, color);
		displayMessage("Set bathroom lights to "+color.toHexString());
		$("#act_bath").css('background-color', color.toHexString());
	}
});

for (var i in lightElements) {
	$(i).spectrum({
		chooseText: "Set",
		showAlpha: true,
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

// ================ Helpers ============== //

function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');

    return color;
}