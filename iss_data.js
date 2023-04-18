mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2luZ3JhaGFtIiwiYSI6ImNsZ2xtOHBucjBid20zZW9icHZmZjBlMXYifQ.y-l8ipEvSLkslcH539T5GA";
const map = new mapboxgl.Map({
  container: "map",
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/satellite-streets-v12",
  zoom: 1.5,
  projections: "globe",
});

map.on("load", async () => {
  // Get the initial location of the International Space Station (ISS).
  const geojson = await getLocation();
  // Add the ISS location as a source.
  map.addSource("iss", {
    type: "geojson",
    data: geojson,
  });

  map.loadImage(
    "international-space-station-63128x1280.png",
    (error, image) => {
      if (error) throw error;

      // Add the image to the map style.
      map.addImage("iss_img", image);

      // Add a data source containing one point feature.
    }
  );

  map.setFog({
    color: "rgb(186, 210, 235)", // Lower atmosphere
    "high-color": "rgb(36, 92, 223)", // Upper atmosphere
    "horizon-blend": 0.02, // Atmosphere thickness (default 0.2 at low zooms)
    "space-color": "rgb(11, 11, 25)", // Background color
    "star-intensity": 0.6, // Background star brightness (default 0.35 at low zoooms )
  });

  // Add the rocket symbol layer to the map.
  // Add a layer to use the image to represent the data.
  map.addLayer({
    id: "points",
    type: "symbol",
    source: "iss", // reference the data source
    layout: {
      "icon-image": "iss_img", // reference the image
      "icon-size": 0.25,
    },
  });
  // Update the source from the API every 2 seconds.
  const updateSource = setInterval(async () => {
    const geojson = await getLocation(updateSource);
    map.getSource("iss").setData(geojson);
  }, 2000);

  async function getLocation(updateSource) {
    // Make a GET request to the API and return the location of the ISS.
    try {
      const response = await fetch(
        "https://api.wheretheiss.at/v1/satellites/25544",
        { method: "GET" }
      );
      //ISS data pulled from API
      const { latitude, longitude, velocity } = await response.json();
      //Print the long and lat to the screen
      document.getElementById("lat").textContent = latitude;
      document.getElementById("long").textContent = longitude;
      document.getElementById("velocity").textContent = velocity;
      // Fly the map to the location.
      map.flyTo({
        center: [longitude, latitude],
        speed: 0.5,
      });
      // Return the location of the ISS as GeoJSON.
      return {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
          },
        ],
      };
    } catch (err) {
      // If the updateSource interval is defined, clear the interval to stop updating the source.
      if (updateSource) clearInterval(updateSource);
      throw new Error(err);
    }
  }
});
