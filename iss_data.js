// Function that pulls the International Spacestation data

async function getISS(){
    const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'
    const response = await fetch(api_url)
    const data = await response.json();
    const {latitude, longitude} = data;
    document.getElementById('lat').textContent = latitude;
    document.getElementById('long').textContent = longitude;
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2luZ3JhaGFtIiwiYSI6ImNsZ2xtYm9xYjFxcWszbW55aWFnaTlmdjMifQ.LXHyb2N3Aod4VM9UywV51w';

const geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {
                'message': 'Foo',
                'iconSize': [600, 600]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [latitude, longitude]
            }
        },            
    ]
};

const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [latitude, longitude],
    zoom: 1.5,
    projection: 'globe',
  
});

// Add markers to the map.
for (const marker of geojson.features) {
    // Create a DOM element for each marker.
    const el = document.createElement('div');
    const width = marker.properties.iconSize[0];
    const height = marker.properties.iconSize[1];
    el.className = 'marker';
    el.style.backgroundImage = `url(international-space-station-63128x1280.png)`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = '100%';

    el.addEventListener('click', () => {
        window.alert(marker.properties.message);
    });

    // Add markers to the map.
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
}

}
getISS()


