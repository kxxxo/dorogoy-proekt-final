
function initMap(lat,lon) {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3h4eG8iLCJhIjoiY2toNmF1bzc4MDFkNDMzcnR2NjI5dXl5YyJ9.ynkrs6eCbqLOdD8Wy0lc8A';
    var center = [lon,lat];
    var map = new mapboxgl.Map({
        container: 'map',
        zoom: 17,
        center: center,
        pitch: 60,

        style: 'mapbox://styles/mapbox/light-v10',
        bearing: -17.6,
        antialias: true

    });
    new mapboxgl.Marker().setLngLat(center).addTo(map);

}
