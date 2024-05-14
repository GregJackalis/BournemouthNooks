var map;
var allMarkers = [];

function initMap(response) {

    var customMapStyles = [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        }
    ];

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 50.7292, lng: -1.8675 },
        styles: customMapStyles
    });

    // Check if response is provided
    if (response) {

        const toilets = [];
        const restaurants = [];
        const coffeeShops = [];
        const parks = [];
        const unis = [];
        const gyms = [];
        const beaches = [];
        const theaters = [];
        const museums = [];
        const hotels = [];
        const clothesShops = [];
        const bars = [];

        response.forEach(function (element) {
            if (element.Type === "toilet") {
                toilets.push(element);
            } else if (element.Type == "restaurant"){
                restaurants.push(element);
            } else if (element.Type == "coffee") {
                coffeeShops.push(element);
            } else if (element.Type == "park") {
                parks.push(element);
            } else if (element.Type == "university") {
                unis.push(element);
            } else if (element.Type == "gym") {
                gyms.push(element);
            } else if (element.Type == "beach") {
                beaches.push(element);
            } else if (element.Type == "theater") {
                theaters.push(element);
            } else if (element.Type == "museum") {
                museums.push(element);
            } else if (element.Type == "hotel") {
                hotels.push(element);
            } else if (element.Type == "clothes") {
                clothesShops.push(element);
            } else if (element.Type == "bar") {
                bars.push(element);
            }
        });

        // the underneath are also used for showing and not showing the markers on the map
        fetchIcon(toilets, "toilet");
        fetchIcon(restaurants, "rest");
        fetchIcon(coffeeShops, "cof");
        fetchIcon(parks, "park");
        fetchIcon(unis, "uni");
        fetchIcon(gyms, "gym");
        fetchIcon(beaches, "beach");
        fetchIcon(theaters, "theater");
        fetchIcon(museums, "museum");
        fetchIcon(hotels, "hotel");
        fetchIcon(clothesShops, "clothes");
        fetchIcon(bars, "bar");

    }
}

function fetchData(callback) {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the URL to send the request to
    var url = "../Back_End/datacol";

    // Configure the request
    xhr.open("GET", url, true);

    // Set up the onload function to handle the response
    xhr.onload = function () {
        // Check if the request was successful (status code 200)
        if (xhr.status === 200) {
            var responseData = xhr.responseText;

            // Find the index of the first '[' and the last ']' in the responseData
            var startIndex = responseData.indexOf('[');
            var endIndex = responseData.lastIndexOf(']');

            // Extract the JSON array substring
            var jsonArrayString = responseData.substring(startIndex, endIndex + 1);

            // Parse the JSON array
            var jsonArray = JSON.parse(jsonArrayString);

            callback(jsonArray); // Call the callback function with fetched data

        } else {
            // Display an error message if the request was not successful
            console.log('Request failed. Status: ' + xhr.status);
        }
    };

    // Set up error handling for the request
    xhr.onerror = function () {
        console.error('Request failed');
    };

    // Send the request
    xhr.send();

}

// Call fetchData with initMap as callback function
fetchData(initMap);


function fetchIcon(backEndRes, type) {
    var requestOptions = {
        method: 'GET',
    };

    if (type == "toilet") {
        fetch("https://api.geoapify.com/v1/icon/?type=material&color=%23409ca0&size=large&icon=restroom&iconType=awesome&strokeColor=%23484242&shadowColor=%23000000&noWhiteCircle&scaleFactor=2&apiKey=e37ca6204f484f9cbddcca6c6e6e193f", requestOptions)
        .then(backEndRes => backEndRes.blob()) // Get the image data as a Blob
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);

            // Iterate over each element of the response array
            backEndRes.forEach(function(element) {
                createMarkers(element, "Public Toilet", imageUrl, type);
            });
        })
        .catch(error => console.log('error', error));

    } else if (type == "rest") {
        fetch("https://api.geoapify.com/v1/icon/?type=material&color=%23a0405e&size=large&icon=utensils&iconType=awesome&strokeColor=%23484242&shadowColor=%23000000&noWhiteCircle&scaleFactor=2&apiKey=e37ca6204f484f9cbddcca6c6e6e193f", requestOptions)
        .then(backEndRes => backEndRes.blob()) // Get the image data as a Blob
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);

            // Iterate over each element of the response array
            backEndRes.forEach(function(element) {
                createMarkers(element, element.Names, imageUrl, type);
            });
        })
        .catch(error => console.log('error', error));

    } else if (type == "cof") {
        fetch("https://api.geoapify.com/v1/icon/?type=material&color=%23d4af37&size=large&icon=coffee&iconType=awesome&strokeColor=%23484242&shadowColor=%23000000&noWhiteCircle&scaleFactor=2&apiKey=e37ca6204f484f9cbddcca6c6e6e193f", requestOptions)
        .then(backEndRes => backEndRes.blob()) // Get the image data as a Blob
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);

            // Iterate over each element of the response array
            backEndRes.forEach(function(element) {
                createMarkers(element, element.Names, imageUrl, type);
            });
        })
        .catch(error => console.log('error', error));

    } else if (type == "park") {
        fetch("https://api.geoapify.com/v1/icon/?type=material&color=%231c7528&size=large&icon=tree&iconType=awesome&strokeColor=%23484242&shadowColor=%23000000&noWhiteCircle&scaleFactor=2&apiKey=e37ca6204f484f9cbddcca6c6e6e193f", requestOptions)
        .then(backEndRes => backEndRes.blob()) // Get the image data as a Blob
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);

            // Iterate over each element of the response array
            backEndRes.forEach(function(element) {
                createMarkers(element, element.Names, imageUrl, type);
            });
        })
        .catch(error => console.log('error', error));

    } else if (type == "uni") {
        fetch("https://api.geoapify.com/v1/icon/?type=material&color=%23d36b25&size=large&icon=building&iconType=awesome&strokeColor=%23484242&shadowColor=%23000000&noWhiteCircle&scaleFactor=2&apiKey=e37ca6204f484f9cbddcca6c6e6e193f", requestOptions)
        .then(backEndRes => backEndRes.blob()) // Get the image data as a Blob
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);

            // Iterate over each element of the response array
            backEndRes.forEach(function(element) {
                createMarkers(element, element.Names, imageUrl, type);
            });
        })
        .catch(error => console.log('error', error));

    } else if (type == "gym") {
        fetch("https://api.geoapify.com/v1/icon/?type=material&color=%23a9e31c&icon=dumbbell&iconType=awesome&noWhiteCircle&scaleFactor=2&apiKey=e37ca6204f484f9cbddcca6c6e6e193f", requestOptions)
        .then(backEndRes => backEndRes.blob()) // Get the image data as a Blob
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);

            // Iterate over each element of the response array
            backEndRes.forEach(function(element) {
                createMarkers(element, element.Names, imageUrl, type);
            });
        })
        .catch(error => console.log('error', error));

    } else if (type == "beach") {
        fetch("https://api.geoapify.com/v1/icon/?type=material&color=%231c9ce3&icon=umbrella-beach&iconType=awesome&noWhiteCircle&scaleFactor=2&apiKey=e37ca6204f484f9cbddcca6c6e6e193f", requestOptions)
        .then(backEndRes => backEndRes.blob()) // Get the image data as a Blob
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);

            // Iterate over each element of the response array
            backEndRes.forEach(function(element) {
                createMarkers(element, element.Names, imageUrl, type);
            });
        })
        .catch(error => console.log('error', error));

    } else if (type == "theater") {
        fetch("https://api.geoapify.com/v1/icon/?type=material&color=%23d311b9&icon=theater-masks&iconType=awesome&noWhiteCircle&scaleFactor=2&apiKey=e37ca6204f484f9cbddcca6c6e6e193f", requestOptions)
        .then(backEndRes => backEndRes.blob()) // Get the image data as a Blob
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);

            // Iterate over each element of the response array
            backEndRes.forEach(function(element) {
                createMarkers(element, element.Names, imageUrl, type);
            });
        })
        .catch(error => console.log('error', error));

    } else if (type == "museum") {
        fetch("https://api.geoapify.com/v1/icon/?type=material&color=%231112d3&icon=university&iconType=awesome&noWhiteCircle&scaleFactor=2&apiKey=e37ca6204f484f9cbddcca6c6e6e193f", requestOptions)
        .then(backEndRes => backEndRes.blob()) // Get the image data as a Blob
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);

            // Iterate over each element of the response array
            backEndRes.forEach(function(element) {
                createMarkers(element, element.Names, imageUrl, type);
            });
        })
        .catch(error => console.log('error', error));

    } else if (type == "hotel") {
        fetch("https://api.geoapify.com/v1/icon/?type=material&color=%23e33636&icon=hotel&iconType=awesome&noWhiteCircle&scaleFactor=2&apiKey=e37ca6204f484f9cbddcca6c6e6e193f", requestOptions)
        .then(backEndRes => backEndRes.blob()) // Get the image data as a Blob
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);

            // Iterate over each element of the response array
            backEndRes.forEach(function(element) {
                createMarkers(element, element.Names, imageUrl, type);
            });
        })
        .catch(error => console.log('error', error));

    } else if (type == "museum") {
        fetch("https://api.geoapify.com/v1/icon/?type=material&color=%231112d3&icon=university&iconType=awesome&noWhiteCircle&scaleFactor=2&apiKey=e37ca6204f484f9cbddcca6c6e6e193f", requestOptions)
        .then(backEndRes => backEndRes.blob()) // Get the image data as a Blob
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);

            // Iterate over each element of the response array
            backEndRes.forEach(function(element) {
                createMarkers(element, element.Names, imageUrl, type);
            });
        })
        .catch(error => console.log('error', error));

    } else if (type == "clothes") {
        fetch("https://api.geoapify.com/v1/icon/?type=material&color=%2384269c&icon=tshirt&iconType=awesome&noWhiteCircle&scaleFactor=2&apiKey=e37ca6204f484f9cbddcca6c6e6e193f", requestOptions)
        .then(backEndRes => backEndRes.blob()) // Get the image data as a Blob
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);

            // Iterate over each element of the response array
            backEndRes.forEach(function(element) {
                createMarkers(element, element.Names, imageUrl, type);
            });
        })
        .catch(error => console.log('error', error));

    } else if (type == "bar") {
        fetch("https://api.geoapify.com/v1/icon/?type=material&color=%2353310b&icon=beer&iconType=awesome&noWhiteCircle&scaleFactor=2&apiKey=e37ca6204f484f9cbddcca6c6e6e193f", requestOptions)
        .then(backEndRes => backEndRes.blob()) // Get the image data as a Blob
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);

            // Iterate over each element of the response array
            backEndRes.forEach(function(element) {
                createMarkers(element, element.Names, imageUrl, type);
            });
        })
        .catch(error => console.log('error', error));

    }
}


function createMarkers(el, titleIcon, imageUrl, markType) {
    // Create marker for each location
    var marker = new google.maps.Marker({
        position: { lat: parseFloat(el.Latitude), lng: parseFloat(el.Longitude) },
        map: map,
        icon: {
            url: imageUrl, // Use data.icon directly here
            scaledSize: new google.maps.Size(30, 42) // Corrected spelling of scaledSize
        },
        title: titleIcon, // Convert ID to string for title
        type: markType
    });

    allMarkers.push(marker);
}

// ---------------------------------------------------------------------------------------------------
// FILTER FUNCTIONALITY
// ---------------------------------------------------------------------------------------------------

// Function to show or hide markers based on their type
function toggleMarkers(markerType, show) {
    allMarkers.forEach(function(marker) {
        if (marker.type === markerType) {
            marker.setVisible(show);
        }
    });
}

// RESTAURANT VIEW
$(function() {
    $("#restBtn").click(function(event) {
        event.preventDefault();

        toggleMarkers("toilet", false);
        toggleMarkers("cof", false);
        toggleMarkers("rest", true);
        toggleMarkers("park", false);
        toggleMarkers("uni", false);
        toggleMarkers("gym", false);
        toggleMarkers("beach", false);
        toggleMarkers("theater", false);
        toggleMarkers("museum", false);
        toggleMarkers("hotel", false);
        toggleMarkers("clothes", false);
        toggleMarkers("bar", false);
    })
});

// UNIVERSIIY VIEW
$(function() {
    $("#uniBtn").click(function(event) {
        event.preventDefault();

        toggleMarkers("toilet", false);
        toggleMarkers("cof", false);
        toggleMarkers("rest", false);
        toggleMarkers("park", false);
        toggleMarkers("uni", true);
        toggleMarkers("gym", false);
        toggleMarkers("beach", false);
        toggleMarkers("theater", false);
        toggleMarkers("museum", false);
        toggleMarkers("hotel", false);
        toggleMarkers("clothes", false);
        toggleMarkers("bar", false);
    })
});

// PARK VIEW
$(function() {
    $("#parkBtn").click(function(event) {
        event.preventDefault();

        toggleMarkers("toilet", false);
        toggleMarkers("cof", false);
        toggleMarkers("rest", false);
        toggleMarkers("park", true);
        toggleMarkers("uni", false);
        toggleMarkers("gym", false);
        toggleMarkers("beach", false);
        toggleMarkers("theater", false);
        toggleMarkers("museum", false);
        toggleMarkers("hotel", false);
        toggleMarkers("clothes", false);
        toggleMarkers("bar", false);
    })
});

// COFFEE SHOP VIEW
$(function() {
    $("#coffeeBtn").click(function(event) {
        event.preventDefault();

        toggleMarkers("toilet", false);
        toggleMarkers("cof", true);
        toggleMarkers("rest", false);
        toggleMarkers("park", false);
        toggleMarkers("uni", false);
        toggleMarkers("gym", false);
        toggleMarkers("beach", false);
        toggleMarkers("theater", false);
        toggleMarkers("museum", false);
        toggleMarkers("hotel", false);
        toggleMarkers("clothes", false);
        toggleMarkers("bar", false);
    })
});

// GYM VIEW
$(function() {
    $("#gymBtn").click(function(event) {
        event.preventDefault();

        toggleMarkers("toilet", false);
        toggleMarkers("cof", false);
        toggleMarkers("rest", false);
        toggleMarkers("park", false);
        toggleMarkers("uni", false);
        toggleMarkers("gym", true);
        toggleMarkers("beach", false);
        toggleMarkers("theater", false);
        toggleMarkers("museum", false);
        toggleMarkers("hotel", false);
        toggleMarkers("clothes", false);
        toggleMarkers("bar", false);
    })
});

// TOILET VIEW
$(function() {
    $("#toiletBtn").click(function(event) {
        event.preventDefault();

        toggleMarkers("toilet", true);
        toggleMarkers("cof", false);
        toggleMarkers("rest", false);
        toggleMarkers("park", false);
        toggleMarkers("uni", false);
        toggleMarkers("gym", false);
        toggleMarkers("beach", false);
        toggleMarkers("theater", false);
        toggleMarkers("museum", false);
        toggleMarkers("hotel", false);
        toggleMarkers("clothes", false);
        toggleMarkers("bar", false);
    })
});

// MUSEUM VIEW
$(function() {
    $("#museumBtn").click(function(event) {
        event.preventDefault();

        toggleMarkers("toilet", false);
        toggleMarkers("cof", false);
        toggleMarkers("rest", false);
        toggleMarkers("park", false);
        toggleMarkers("uni", false);
        toggleMarkers("gym", false);
        toggleMarkers("beach", false);
        toggleMarkers("theater", false);
        toggleMarkers("museum", true);
        toggleMarkers("hotel", false);
        toggleMarkers("clothes", false);
        toggleMarkers("bar", false);
    })
});

// HOTEL VIEW
$(function() {
    $("#hotelBtn").click(function(event) {
        event.preventDefault();

        toggleMarkers("toilet", false);
        toggleMarkers("cof", false);
        toggleMarkers("rest", false);
        toggleMarkers("park", false);
        toggleMarkers("uni", false);
        toggleMarkers("gym", false);
        toggleMarkers("beach", false);
        toggleMarkers("theater", false);
        toggleMarkers("museum", false);
        toggleMarkers("hotel", true);
        toggleMarkers("clothes", false);
        toggleMarkers("bar", false);
    })
});

// CLOTHE STORE VIEW
$(function() {
    $("#clotheBtn").click(function(event) {
        event.preventDefault();

        toggleMarkers("toilet", false);
        toggleMarkers("cof", false);
        toggleMarkers("rest", false);
        toggleMarkers("park", false);
        toggleMarkers("uni", false);
        toggleMarkers("gym", false);
        toggleMarkers("beach", false);
        toggleMarkers("theater", false);
        toggleMarkers("museum", false);
        toggleMarkers("hotel", false);
        toggleMarkers("clothes", true);
        toggleMarkers("bar", false);
    })
});

// THEATER VIEW
$(function() {
    $("#theaterBtn").click(function(event) {
        event.preventDefault();

        toggleMarkers("toilet", false);
        toggleMarkers("cof", false);
        toggleMarkers("rest", false);
        toggleMarkers("park", false);
        toggleMarkers("uni", false);
        toggleMarkers("gym", false);
        toggleMarkers("beach", false);
        toggleMarkers("theater", true);
        toggleMarkers("museum", false);
        toggleMarkers("hotel", false);
        toggleMarkers("clothes", false);
        toggleMarkers("bar", false);
    })
});

// BAR VIEW
$(function() {
    $("#barBtn").click(function(event) {
        event.preventDefault();

        toggleMarkers("toilet", false);
        toggleMarkers("cof", false);
        toggleMarkers("rest", false);
        toggleMarkers("park", false);
        toggleMarkers("uni", false);
        toggleMarkers("gym", false);
        toggleMarkers("beach", false);
        toggleMarkers("theater", false);
        toggleMarkers("museum", false);
        toggleMarkers("hotel", false);
        toggleMarkers("clothes", false);
        toggleMarkers("bar", true);
    })
});

// BEACH VIEW
$(function() {
    $("#beachBtn").click(function(event) {
        event.preventDefault();

        toggleMarkers("toilet", false);
        toggleMarkers("cof", false);
        toggleMarkers("rest", false);
        toggleMarkers("park", false);
        toggleMarkers("uni", false);
        toggleMarkers("gym", false);
        toggleMarkers("beach", true);
        toggleMarkers("theater", false);
        toggleMarkers("museum", false);
        toggleMarkers("hotel", false);
        toggleMarkers("clothes", false);
        toggleMarkers("bar", false);
    })
});

// SHOW ALL VIEW
$(function() {
    $("#allBtn").click(function(event) {
        event.preventDefault();


        allMarkers.forEach(function (element) {
            toggleMarkers(element.type, true);
        })
    })
});




// ICON FOR WIFI (JUST IN CASE)
// https://api.geoapify.com/v1/icon/?type=material&color=%23b6b536&size=large&icon=wifi&iconType=awesome&strokeColor=%23484242&shadowColor=%23000000&noWhiteCircle&scaleFactor=2&apiKey=YOUR_API_KEY

// FIND NAMES OF THE PLACES
// https://www.bcpcouncil.gov.uk/campaigns-and-programmes/smart-place/bcp-council-smart-place-free-wi-fi/public-wi-fi-locations