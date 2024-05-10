function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: -34.397, lng: 150.644} // Default center coordinates
    });

    // Retrieve locations from your database (replace with actual data retrieval)
    var locations = [
        {lat: -34.405, lng: 150.648, name: 'Location 1'},
        {lat: -34.39, lng: 150.64, name: 'Location 2'},
        {lat: -34.38, lng: 150.65, name: 'Location 3'}
    ];

    // Add markers for each location
    locations.forEach(function(location) {
        var marker = new google.maps.Marker({
            position: {lat: location.lat, lng: location.lng},
            map: map,
            title: location.name
        });
    });
}