// javascript file for double-agent map

// GLOBAL VARIABLES
// marker array
var markerArray = [];
var map = null;

// definition of icon for male agents
var maleIcon = L.icon({
	iconUrl: 'images/binoculars_blue.png',
	shadowUrl: 'images/binoculars_blue.png',

	iconSize:     [24, 24], // size of the icon
	shadowSize:   [0, 0], // size of the shadow
	iconAnchor:   [12, 0], // point of the icon which will correspond to marker's location
	shadowAnchor: [0, 0],  // the same for the shadow
	popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

// definition of female icon
var femaleIcon = L.icon({
	iconUrl: 'images/binoculars_pink.png',
	shadowUrl: 'images/binoculars_pink.png',

	iconSize:     [24, 24], // size of the icon
	shadowSize:   [0, 0], // size of the shadow
	iconAnchor:   [12, 0], // point of the icon which will correspond to marker's location
	shadowAnchor: [0, 0],  // the same for the shadow
	popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});


// FUNCTIONS
// function to generate map of continental US and return it
function generateMap() {
	// create basic map in div
	var map = L.map('mapid').setView([38.8333333,-98.585522], 4);

	// // gets the bounds of the continental us
	// var maxBounds = L.latLngBounds(
	// 	L.latLng(25.912635, -125.437543), //Southwest
	//    	L.latLng(49.696678, -65.155307)  //Northeast
	// );

	// add dark layer to map
	L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib3dlbmF1Y2giLCJhIjoiY2owbzBnZmU4MDBrbTJxb2Ezcm9odGY2byJ9.0YjNeMOCJByZ6PXlCAevrg', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	}).addTo(map);

	// return map
	return map;
}

// get JSON for double agents from Spring Boot REST API
function getAgents(updateType) {
	$.get("persons", function(json, status) {
		// if "all" option, indicating that we'd like to display all agents
		if (status == "success" && updateType == "all") {
			// call updateMap
			updateMap(json);
		}
		// if just the name is filtered
		else if (status == "success" && updateType == "name") {

			// remove agent from json object if agent's name does not contain string
			for (agent in json._embedded.persons) {
				var currentAgent = json._embedded.persons[agent];
				var filterName = $("#searchbox").val().toLowerCase();
				var currentName = currentAgent.name.toLowerCase();
				if (currentName.indexOf(filterName) < 0) {
					delete json._embedded.persons[agent];
				}
			}

			// call updateMap
			updateMap(json);
		}
		// if just the age is filtered
		else if (status == "success" && updateType == "age") {
			// remove agent from json object if agent's age is not less than max age
			for (agent in json._embedded.persons) {
				var currentAgent = json._embedded.persons[agent];
				var filterAge = parseInt($("#agebox").val());
				var currentAge = currentAgent.age;
				if (currentAge > filterAge) {
					delete json._embedded.persons[agent];
				}
			}

			// call updateMap
			updateMap(json);
		}
		// if agent name and age is filtered
		else if (status == "success" && updateType == "both") {
			// remove agent from json object if agent's age is not less than max age
			for (agent in json._embedded.persons) {
				var currentAgent = json._embedded.persons[agent];
				var filterAge = parseInt($("#agebox").val());
				var currentAge = currentAgent.age;
				var filterName = $("#searchbox").val().toLowerCase();
				var currentName = currentAgent.name.toLowerCase();

				if (currentAge > filterAge || currentName.indexOf(filterName) < 0) {
					delete json._embedded.persons[agent];
				}
			}

			// call updateMap
			updateMap(json);
		}
		else {
			// in case request fails
			alert("Request to Double Agent API Failed");
		}
	});
}

// updates map to show all agents passed in by the json object
function updateMap(json) {

	// clear the map
	for (mark in markerArray) {
		map.removeLayer(markerArray[mark]);
	}
	markerArray = [];

	// loop through agents in json parameter
	for (agent in json._embedded.persons) {
		// save
		var currentAgent = json._embedded.persons[agent]
		var name = currentAgent.name;
		var lat = currentAgent.latitude;
		var long = currentAgent.longitude;
		var age = currentAgent.age;
		var gender = currentAgent.gender;
		var marker = null;
		if (gender == "Male") {
			marker = L.marker([lat, long], {icon: maleIcon}).addTo(map);
		}
		else {
			marker = L.marker([lat, long], {icon: femaleIcon}).addTo(map);
		}

		// set up popup text
		var popupText = "<b>Name: </b> " + name + "<br><b>Latitude: </b>" + lat + "<br><b>Longitude: </b>" + long + "<br><b>Age: </b>" + age + "<br><b>Gender: </b>" + gender;

		// make popups for each icon with info on the agent
		marker.bindPopup(popupText);
		marker.on('mouseover', function (e) {
			this.openPopup();
		});
		marker.on('mouseout', function (e) {
			this.closePopup();
		});

		// add to marker array
		markerArray.push(marker);
	}
}

window.onload = function(){
	// call generateMap and save map
	map = generateMap();

	// get all agents and put on the map
	getAgents("all");

	// set event listener for filter button
	$( "#filterbutton" ).click(function() {
		// filter type set
		filterType = "";
		var searchIn = $("#searchbox").val();
		var ageIn = $("#agebox").val();

		if (ageIn == "") {
			if (searchIn != "") {
				filterType = "name";
			}
			else {
				filterType = "all";
			}
		}
		else {
			if (searchIn == "") {
				filterType = "age";
			}
			else {
				filterType = "both";
			}
		}

		// call get agents with the parameter
		getAgents(filterType);
	});
}
