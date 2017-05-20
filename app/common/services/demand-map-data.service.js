/**
 * Created by yotam on 22/12/2016.
 */
angular.module('myApp.services')
    .service('DemandMapDataService', [ function () {
        var _map, _heatmap;
        var CONFIG = {
            RATING_FACTOR : 0.2
        };

        /**
         * Calculate the demand for each listing using its review_count and star_rating.
         * @param listing
         * @returns {number}
         * @private
         */
        function _calcWeight(listing) {
            var reviews_count = listing.reviews_count ? listing.reviews_count : 0;
            var star_rating = listing.star_rating ? listing.star_rating : 1;
            var score = (reviews_count) * (star_rating * CONFIG.RATING_FACTOR);
            return score;
        }

        var Service = {
            /**
             * Init the heatmap UI component using the Google Maps JS API.
             * refer to: https://developers.google.com/maps/documentation/javascript/heatmaplayer
             * @param data the weighted geolocation datapoints for the heatmap visualization calculation.
             */
            initMap: function (data) {
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
            },
            /**
             * Convert listings data to WeightedLocation points used by Google Maps API.
             * refer to: https://developers.google.com/maps/documentation/javascript/reference#WeightedLocation
             * @param listings
             * @returns {*}
             */
            getMapDataForListings: function (listings) {
                return listings.map(function (obj) {
                    var weight = _calcWeight(obj.listing);
                    return {
                        location: new google.maps.LatLng(obj.listing.lat, obj.listing.lng),
                        weight: weight
                    };
                });
            }

        };

        return Service;
    }]);
