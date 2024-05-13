var map;

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
            }
        });

        fetchIcon(toilets, "toilet");
        fetchIcon(restaurants, "rest");
        fetchIcon(coffeeShops, "cof");
        fetchIcon(parks, "park");
        fetchIcon(unis, "uni");
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
                createMarkers(element, "Public Toilet", imageUrl);
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
                createMarkers(element, "Restaurant", imageUrl);
            });
        })
        .catch(error => console.log('error', error));

    } else if (type == "cof") {
        fetch("https://api.geoapify.com/v1/icon/?type=material&color=%23b6b422&size=large&icon=coffee&iconType=awesome&strokeColor=%23484242&shadowColor=%23000000&noWhiteCircle&scaleFactor=2&apiKey=e37ca6204f484f9cbddcca6c6e6e193f", requestOptions)
        .then(backEndRes => backEndRes.blob()) // Get the image data as a Blob
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);

            // Iterate over each element of the response array
            backEndRes.forEach(function(element) {
                createMarkers(element, "Coffee Shop", imageUrl);
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
                createMarkers(element, "Park", imageUrl);
            });
        })
        .catch(error => console.log('error', error));

    } else if (type == "uni") {
        fetch("https://api.geoapify.com/v1/icon/?type=material&color=%23d36b25&size=large&icon=university&iconType=awesome&strokeColor=%23484242&shadowColor=%23000000&noWhiteCircle&scaleFactor=2&apiKey=e37ca6204f484f9cbddcca6c6e6e193f", requestOptions)
        .then(backEndRes => backEndRes.blob()) // Get the image data as a Blob
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);

            // Iterate over each element of the response array
            backEndRes.forEach(function(element) {
                createMarkers(element, "University", imageUrl);
            });
        })
        .catch(error => console.log('error', error));

    }
}


function createMarkers(el, titleIcon, imageUrl) {
    // Create marker for each location
    var marker = new google.maps.Marker({
        position: { lat: parseFloat(el.Latitude), lng: parseFloat(el.Longitude) },
        map: map,
        icon: {
            url: imageUrl, // Use data.icon directly here
            scaledSize: new google.maps.Size(30, 42) // Corrected spelling of scaledSize
        },
        title: titleIcon // Convert ID to string for title
    });
}


// ICON FOR WIFI (JUST IN CASE)
// https://api.geoapify.com/v1/icon/?type=material&color=%23b6b536&size=large&icon=wifi&iconType=awesome&strokeColor=%23484242&shadowColor=%23000000&noWhiteCircle&scaleFactor=2&apiKey=YOUR_API_KEY

// FIND NAMES OF THE PLACES
// https://www.bcpcouncil.gov.uk/campaigns-and-programmes/smart-place/bcp-council-smart-place-free-wi-fi/public-wi-fi-locations