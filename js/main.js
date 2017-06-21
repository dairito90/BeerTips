var geocoder;
var map;
var markers = Array();
var infos = Array();

function initialize() {

    geocoder = new google.maps.Geocoder();

    var myLatlng = new google.maps.LatLng(27.994402, -81.760254);

    var myOptions = {
        zoom: 14,

        center: myLatlng,

        mapTypeId: google.maps.MapTypeId.ROADMAP

    };

    map = new google.maps.Map(document.getElementById('map'), myOptions);

}


function clearOverlays() {

    if (markers) {

        for (i in markers) {

            markers[i].setMap(null);

        }

        markers = [];

        infos = [];

    }

}



function clearInfos() {

    if (infos) {

        for (i in infos) {

            if (infos[i].getMap()) {

                infos[i].close();

            }

        }

    }

}

function findAddress() {

    var address = document.getElementById("where").value;

    geocoder.geocode({
        'address': address
    }, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {

            var addrLocation = results[0].geometry.location;

            map.setCenter(addrLocation);

            document.getElementById('lat').value = results[0].geometry.location.lat();

            document.getElementById('lng').value = results[0].geometry.location.lng();

            var addrMarker = new google.maps.Marker({position: addrLocation, map: map, title: results[0].formatted_address, icon: 'marker.png'});

        } else {

            alert('Geocode was not successful for the following reason: ' + status);

        }

    });

}

function findPlaces() {

    var type = document.getElementById('type').value;

    var radius = document.getElementById('radius').value;

    var keyword = document.getElementById('keyword').value;

    var lat = document.getElementById('lat').value;

    var lng = document.getElementById('lng').value;

    var cur_location = new google.maps.LatLng(lat, lng);

    var request = {

        location: cur_location,

        radius: radius,

        types: [type]

    };

    if (keyword) {

        request.keyword = [keyword];

    }

    service = new google.maps.places.PlacesService(map);

    service.search(request, createMarkers);

}

function createMarkers(results, status) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {

        clearOverlays();

        for (var i = 0; i < results.length; i++) {

            createMarker(results[i]);

        }

    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {

        alert('Sorry, nothing is found');

    }

}

function createMarker(obj) {

    var mark = new google.maps.Marker({position: obj.geometry.location, map: map, title: obj.name});

    markers.push(mark);

    var infowindow = new google.maps.InfoWindow({

        content: '<img src="' + obj.icon + '" / > <font style="color:#000;">' + obj.name + '<br/>Rating: ' + obj.rating + '<br/>Vicinity: ' + obj.vicinity + '</font>'

    });

    google.maps.event.addListener(mark, 'click', function() {

        clearInfos();

        infowindow.open(map, mark);

    });

    infos.push(infowindow);

}

google.maps.event.addDomListener(window, 'load', initialize);
