// Function that pulls the International Spacestation data

async function getISS(){
    const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'
    const response = await fetch(api_url)
    const data = await response.json();
    const {latitude, longitude} = data;
    document.getElementById('lat').textContent = latitude;
    document.getElementById('long').textContent = longitude;
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2luZ3JhaGFtIiwiYSI6ImNsZ2xtYm9xYjFxcWszbW55aWFnaTlmdjMifQ.LXHyb2N3Aod4VM9UywV51w';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/dark-v11', // style URL
        zoom: 1.5, // starting zoom
        center: [latitude, longitude] // starting position
        });
         
        map.on('load', () => {
        // Load an image from an external URL.
        map.loadImage(
        'international-space-station-63128x1280.png',
        (error, image) => {
        if (error) throw error;
         
        // Add the image to the map style.
        map.addImage('cat', image);
         
        // Add a data source containing one point feature.
        map.addSource('point', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': [
        {
        'type': 'Feature',
        'geometry': {
        'type': 'Point',
        'coordinates': [latitude, longitude]
        }
        }
        ]
        }
        });
         
        // Add a layer to use the image to represent the data.
        map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'point', // reference the data source
        'layout': {
        'icon-image': 'cat', // reference the image
        'icon-size': 0.25
        }
        });
        }
        );
        });
  
}

getISS()