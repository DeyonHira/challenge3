// Accestoken van mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiZGV5b24iLCJhIjoiY2s4azM0cGIyMDFpdTNndXB3YjBxOGlvZCJ9.maz0MJ2mxQRu1CQDfVwgiA';

// https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/ Tutorial gekeken van: Initialize your map 
// https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-96, 37.8],
    zoom: 4,
});



map.on('load', function () {

    fetch('https://api.openbrewerydb.org/breweries?by_state=texas') 

        .then(function (response) {
            return response.json();
        })

        .then(function (response) {

          
            var getBreweryData = response;

        
            getBreweryData.forEach(breweryData => {
                console.log(breweryData);

            
                var breweriesCoordinates = [breweryData.longitude, breweryData.latitude];


              
                var geojson = {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',

                        },
			}]
                }

                geojson.features.forEach(function (marker) {

                
                    var markerpoint = document.createElement('div');
                    markerpoint.className = 'marker';


                    var popup = new mapboxgl.Popup()
                        .setHTML("<h3>" + breweryData.name + "</h4>" + "Adres: " + breweryData.street + ", " + breweryData.city + "</br>" + "Nummer: " + breweryData.phone + "</br>" + "Website: " + breweryData.website_url)

                   // Markers toevoegen op mapbox
                    new mapboxgl.Marker(markerpoint)
                        .setLngLat(breweriesCoordinates)
                        .setPopup(popup)
                        .addTo(map);
                })

            })


        })
})
