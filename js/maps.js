var map;
var pos;
var request;
var service;
var infowindow;

function initMap() {
	// var latlong = {lat: 1.4970331, lng: 103.7627746};
	var pyrmont = new google.maps.LatLng(1.5584954, 103.635994);

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 14,
		center: pyrmont
	});

	infowindow = new google.maps.InfoWindow();

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;

			pos = new google.maps.LatLng(lat, lng);

			request = {
				location: pos,
				radius: '2000',
				types: ['food']
			};

			infowindow.setPosition(pos);
			infowindow.setContent('You are here.');
			infowindow.open(map);
			map.setCenter(pos);

			service = new google.maps.places.PlacesService(map);
			service.nearbySearch(request,callback);

		}, function() {
			handleLocationError(true, infowindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infowindow, map.getCenter());
	}
	
}

function callback(results,status){
	if (status == google.maps.places.PlacesServiceStatus.OK){
		for(var i = 0; i< results.length; i++){
			var place = results[i];
			createMarker(results[i]);
		}
	}else{

	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
	  map: map,
	  position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'mouseover', function() {
	  infowindow.setContent(place.name);
	  infowindow.open(map, this);
	});

	// Zoom to 9 when clicking on marker
	google.maps.event.addListener(marker,'click',function() {
		map.setZoom(18);
		map.setCenter(marker.getPosition());
	});
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infowindow.setPosition(pos);
  infowindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infowindow.open(map);
}

