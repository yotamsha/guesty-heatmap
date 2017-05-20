'use strict';

angular.module('myApp.properties-search', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/properties-search/properties-search.html',
            controller: 'PropertiesSearchCtrl',
            controllerAs: 'ctrl',
            reloadOnSearch : false
        });
    }])

    .controller('PropertiesSearchCtrl', ['AirbnbAPIService','$mdDialog',
        function (AirbnbAPIService, $mdDialog) {
            var ctrl = this;
            var _map, _heatmap;
            ctrl.selectedLocation = 'San Francisco';

            function getRandomArbitrary(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }
            function _calcWeight(listing){
                var reviews_count = listing.reviews_count ? listing.reviews_count : 0;
                var star_rating = listing.star_rating ? listing.star_rating : 1;
                var score = (reviews_count) * (star_rating * 0.2);
                console.log("listing.reviews_count: " +listing.reviews_count);
                console.log("listing.star_rating: " +listing.star_rating);
                console.log("score: " + score);
                return score;
            }
            function _getMapDataForListings(listings) {
                return listings.map(function(obj){
                    var weight = _calcWeight(obj.listing);
                    return {
                            location: new google.maps.LatLng( obj.listing.lat, obj.listing.lng),
                            weight: weight
                        };
                });
            }
            function initMap(data) {
                _map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: {lat: 37.775, lng: -122.434},
                    mapTypeId: 'roadmap'
                });

                _heatmap = new google.maps.visualization.HeatmapLayer({
                    data: data,
                    map: _map,
                    radius: 50
                });
            }

            function _init(){
                AirbnbAPIService.getListingsByLocation(ctrl.selectedLocation).then(function(data){
                    ctrl.listings = data;
                    initMap(_getMapDataForListings(ctrl.listings));
                });
            }
            _init();
/*
            ctrl.locationChanged = function () {
                AirbnbAPIService.getListingsByLocation(ctrl.selectedLocation).then(function(data){
                    ctrl.listings = data;
                    initMap(_getMapDataForListings(ctrl.listings));
                });
            };
*/

        }]);
