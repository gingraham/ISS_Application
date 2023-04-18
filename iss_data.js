async function getISS(){
    const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'
    const response = await fetch(api_url)
    const data = await response.json();
    const iss_latitude = data.latitude;
    const iss_longitude = data.longitude;
    console.log(iss_latitude, iss_longitude)
}
getISS();
