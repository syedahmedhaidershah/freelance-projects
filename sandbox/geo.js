if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
      console.log('NOT');
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude); 
}