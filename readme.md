# Hue Web Controller

![Hue Web Controller UI](http://files.harrischristiansen.com/3r2N0m123I1K/hue_webcontrol.png "Hue Web Controller UI")

## Synopsis

Basic web controller for [Philips Hue](http://meethue.com) lighting system.  

Most of this project has been migrated to my newer web lighting controller: [github.com/harrischristiansen/controlshow](https://github.com/harrischristiansen/controlshow)  

## Features

- [X] Master Controls
	- [X] All On/Off
	- [X] All Flash Once
	- [X] Master Brightness (increase, decrease, or set to value)
- [X] Light Controls
	- [X] 2D Map of lights, with location, name, and type
	- [X] Load current lights from bridge
	- [X] Control lights individually (full color, on/off, and brightness)
	- [X] Control lights by group (full color, on/off, and brightness)
- [X] Scenes
	- [X] Create and save scenes
		- [X] Control lights individually (full color, on/off, brightness, or do nothing)

## Setup

- [ ] Set bridge IP address and API key in `js/site.js`
	- [ ] Create Hue API Key: POST to /api using (http://127.0.0.1/debug/clip.html) with body `{"devicetype":"my_hue_app#iphone harris"}`
		- [ ] Instructions available on [Hue Documentation](https://developers.meethue.com/documentation/getting-started)

## Contributors

@harrischristiansen [HarrisChristiansen.com](http://www.harrischristiansen.com) (code@harrischristiansen.com)  

