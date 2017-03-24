// javascript file for double-agent map

// function to generate map of continental US and return it
function generateMap() {
	// create basic map in div
	var map = L.map('mapid')

	// gets the bounds of the continental us
	var maxBounds = L.latLngBounds(
	    L.latLng(25.912635, -125.437543), //Southwest
	    L.latLng(49.696678, -65.155307)  //Northeast
	);

	// add dark layer to map
	L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib3dlbmF1Y2giLCJhIjoiY2owbzBnZmU4MDBrbTJxb2Ezcm9odGY2byJ9.0YjNeMOCJByZ6PXlCAevrg', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	}).addTo(map);

	// set bounds and zoom to just show continental US
	map.setMaxBounds(maxBounds);
	map.fitBounds(maxBounds);
	map.setZoom(4);

	// return map
	return map;
}

// call generateMap and save map
var map = generateMap();
