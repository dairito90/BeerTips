var map;
function initialize() {
    var florida = new google.maps.LatLng(27.994402, -81.760254);
    map = new google.maps.Map(document.getElementById('map'), {
        center:florida,
        zoom: 8
    });


var request = {
    location: florida,
    radius: '500',
    types: ['pubs','brewery']
};

var service = new google.maps.places.PlacesService(map);
service.nearbySearch(request, callback);
}
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({map: map, position: place.geometry.location});
}

// var map;
// var service;
// var infowindow;
//
// function initialize() {
//   var florida = new google.maps.LatLng(27.6648,81.5158);
//
//   map = new google.maps.Map(document.getElementById('map'), {
//       center: florida,
//       zoom:8
//     });
//
//   var request = {
//     location: florida,
//     radius: '500',
//     types: ['beer','brewery']
//   };
//
//   service = new google.maps.places.PlacesService(map);
//   service.nearbySearch(request, callback);
// }
//
// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }
