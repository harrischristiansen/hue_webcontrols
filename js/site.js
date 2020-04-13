/*
	@ Harris Christiansen (code@HarrisChristiansen.com)
	November 2017
	Project: Hue Web Controls - github.com/harrischristiansen/hue_webcontrols
*/


var	colors = colors || window.colors,
	hue = hue || window.hue,
	IPAddress = '192.168.50.133',
	APIKey = 'oDKerwXFsTJ56RyyIcVRzf8iUPSAR58nqeaFjbqZ';

var midbed_1=1, midbed_2=2, midbed_3=14,
	glass_lamp=7, shelve_lamp=13,
	tv_cabinet=8, glass_cabinet=10,
	bloom_1=4, bloom_2=5, bloom_3=6,
	play_1=15, play_2=16, play_3=17,
	go_1=9, go_2=11, go_3=12;
var lights = [midbed_1, midbed_2, midbed_3, glass_lamp, shelve_lamp, tv_cabinet, glass_cabinet, bloom_1, bloom_2, bloom_3, play_1, play_2, play_3, go_1, go_2, go_3],
	room_family = [tv_cabinet, glass_cabinet],
	room_living = [glass_lamp, shelve_lamp, bloom_1, bloom_2, bloom_3, play_1, play_2, play_3, go_1, go_2, go_3],
	room_midbed = [midbed_1, midbed_2, midbed_3];
var lightElements = {
	".midbed_1": [midbed_1, "Midbed Lamp Middle"],
	".midbed_2": [midbed_2, "Midbed Lamp Top"],
	".midbed_3": [midbed_3, "Miedbed Lamp Bottom"],
	".tv_cabinet": [tv_cabinet, "TV Cabinet"],
	".glass_lamp": [glass_lamp, "Glass Lamp"],
	".shelve_lamp": [shelve_lamp, "Shelve Lamp"],
	".glass_cabinet": [glass_cabinet, "Glass Cabinet"],
	".bloom_1": [bloom_1, "Bloom 1"],
	".bloom_2": [bloom_2, "Bloom 2"],
	".bloom_3": [bloom_3, "Bloom 3"],
	".play_1": [play_1, "Play 1"],
	".play_2": [play_2, "Play 2"],
	".play_3": [play_3, "Play 3"],
	".go_1": [go_1, "Go 1"],
	".go_2": [go_2, "Go 2"],
	".go_3": [go_3, "Go 3"],
};
var color_palette = ['transparent', '#000001', '#FF0000', '#904000', '#ffb400', '#ff00b0', '#bb00ff', '#0000FF', '#00FF00', '#8183ff', '#e1e2fb', '#f9bbbb', '#f9bbf1']

// ================ Setup ============== //

$(document).ready(documentReady);

function documentReady() {
	setupPage();

	// Configure Hue
	hue.setIpAndApiKey(IPAddress, APIKey);
	hue.setLightIDs(lights);

	try {
		loadCurrentLights();
		displayMessage("Connected!");
	} catch (e) {
		displayMessage("Not Connected!", isFailure=true);
	}
}

function setupPage() {
	createButtonListeners();
	createColorpickers();
}

var isBusy = false;

function createButtonListeners() {
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
	$("#act_flash").click(function() {
		if (isBusy) {
			return false;
		}
		displayMessage("Lights Flashed!");
		isBusy = true;
		for (var i in lights) {
			setTimeout(flashLight, 260*i, lights[i]);
		}
		setTimeout(function() {
			isBusy = false;
		}, 260*lights.length + 2000);
	});
	$("#act_noEffects").click(function() {
		hue.removeEffectAll();
		displayMessage("Light effects canceled!");
	});
	$("#act_colorloop").click(function() {
		hue.colorloopAll();
		displayMessage("Lights set to colorloop!");
	});

	// ================ Brightness ============== //

	$("#act_decrease").click(function() {
		if (isBusy) {
			return false;
		}
		isBusy = true;

		hue.dimAll(50);
		displayMessage("Brightness decreased!");
		setTimeout(function() {
			isBusy = false;
			loadCurrentLights();
		}, 1000);
	});
	$("#act_increase").click(function() {
		if (isBusy) {
			return false;
		}
		isBusy = true;

		hue.brightenAll(50);
		displayMessage("Brightness increased!");
		setTimeout(function() {
			isBusy = false;
			loadCurrentLights();
		}, 1000);
	});
	$(".act_setBright").click(function(evt) {
		brightness = parseInt(evt.target.getAttribute('data-brightness'));
		hue.setAllBrightness(brightness);
		displayMessage("Brightness set to "+parseInt(brightness/255*100)+"%!");
		loadCurrentLights();
	});
}

// ================ Scenes ============== //

function setRoom(room, color) {
	for (var i in room) {
		setLightColor(lightElements[getElementClass(room[i])], color);
		setElementColor(room[i], "#"+color);
	}
}

$(".setScene").click(setScene);
function setScene(evt) {
	var sceneID = evt.target.getAttribute('data-scene');
	$("#"+sceneID+" > div").each(function(i) {
		classname = "."+$(this).attr('class').split(' ')[1];
		light = lightElements[classname];
		color = $(this).spectrum("get");
		setLightColor(light, color);
	});
	displayMessage("Set scene: "+evt.target.innerText);
}

// ================ Light Status ============== //

function loadCurrentLights() {
	$(".currentLights > div").each(function(i) {
		classname = "."+$(this).attr('class').split(' ')[1];
		light = lightElements[classname];
		color = "#"+hue.getColorHex(light[0]);
		alpha = hue.getBrightnessValue(light[0]) / 255;
		$(this).css("background-color", color);
		$(this).spectrum("set", colors.hexToRGBAString(color, alpha));
	});
}

// ================ Light Assignment ============== //

function setColor(color) {
	classname = "."+$(this).attr("class").split(' ')[1];
	light = lightElements[classname];

	setLightColor(light, color, $(this));
	setElementColor($(this), color.toHexString());
}

function setLightColor(light, color, element=null) {
	if (color._a == 0) { // Transparent = Ignore
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
		setTimeout(setLightToHex, 50, light[0], color_hex.substring(1, 7), Math.ceil(color._a*255));
		if (element != null) {
			displayMessage("Set "+light[1]+" light to <span style=\"color: "+color_hex+";\">"+color_hex+"</span>");
		}
	}
}

function setLightToHex(lightID, colorHex, brightness=null) {
	hue.setColor(lightID, colorHex);
	if (brightness != null && brightness > 1 && brightness <= 255) {
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

	element = $(".currentLights > "+light);
	bgcolor = element.css('background-color');
	setElementColor(element, '#000000');
	setTimeout(setElementColor, 1400, element, bgcolor);
}

// ================ Color Pickers ============== //

function createColorpickers() {
	$("#act_family").spectrum({
		chooseText: "Set",
		showAlpha: true,
		showPalette: true,
		palette: color_palette,
		change: function(color) {
			setRoom(room_family, color);
			displayMessage("Set family room lights to "+color.toHexString());
			$("#act_family").css('background-color', color.toHexString());
		}
	});
	$("#act_living").spectrum({
		chooseText: "Set",
		showAlpha: true,
		showPalette: true,
		palette: color_palette,
		change: function(color) {
			setRoom(room_living, color);
			displayMessage("Set living room lights to "+color.toHexString());
			$("#act_living").css('background-color', color.toHexString());
		}
	});
	$("#act_midbed").spectrum({
		chooseText: "Set",
		showAlpha: true,
		showPalette: true,
		palette: color_palette,
		change: function(color) {
			setRoom(room_midbed, color);
			displayMessage("Set game room lights to "+color.toHexString());
			$("#act_midbed").css('background-color', color.toHexString());
		}
	});

	for (var i in lightElements) {
		$(i).each(function(index) {
			lightColor = $(this).attr("data-initial-color");
			$(this).spectrum({
				color: lightColor,
				chooseText: "Set",
				showAlpha: true,
				showPalette: true,
				palette: color_palette,
				change: setColor,
			});
		});
	}
}

// ================ Display Messages ============== //

function displayMessage(msg, isFailure=false) {
	if (isFailure) {
		var element = $('<div class="alert alert-danger" role="alert">'+msg+"</div>").appendTo('#msgs').delay(2200).slideUp(300);
	} else {
		var element = $('<div class="alert alert-success" role="alert">'+msg+"</div>").appendTo('#msgs').delay(2200).slideUp(300);
	}
	setTimeout(removeElement, 10000, element);
}

function removeElement(element) {
	element.remove();
}
