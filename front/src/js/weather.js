$(function() {
	// let latitude = 55.814754 ;
	// let longitude = 49.082462299999996
	// Я здесь живу. Если что заходите в гости
	let latitude =Cookies.get('latitude');
	let longitude = Cookies.get('longitude');

	if(latitude && longitude) {
		console.log(latitude,longitude);
		initMap(latitude,longitude);
	} else {
		getCoordinates(async(latitude,longitude) => {
			Cookies.set('latitude', latitude);
			Cookies.set('longitude', longitude);
			console.log(document.cookie);
			initMap(latitude,longitude);

		});
	}
});

function getCoordinates(done){
	if ("geolocation" in navigator) {
		// Do something with coordinates returned
		function processCoords(position) {
			let latitude = position.coords.latitude;
			let longitude = position.coords.longitude;
			done(latitude,longitude);
		}

		// Fetch Coordinates
		navigator.geolocation.getCurrentPosition(processCoords);
	}
}


