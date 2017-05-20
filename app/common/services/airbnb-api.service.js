/**
 * Created by yotam on 22/12/2016.
 */
angular.module('myApp.services')
    .service('AirbnbAPIService', ['$http', function ($http) {
        var RESULTS_LIMIT = 25;
        var API_PREFIX = 'https://api.airbnb.com/v2';

        var Service = {
            getListingsByLocation: function (location) {
                return $http.get(API_PREFIX + '/search_results?' +
                    'client_id=3092nxybyb0otqw18e8nh5nty&' +
                    '_limit=' + RESULTS_LIMIT + '&' +
                    'location=' + location)
                    .then(function (result) {
                        return result.data.search_results;
                    });
            },

            getReviewsById: function (id) {
                return $http.get(API_PREFIX + '/reviews?' +
                    'client_id=3092nxybyb0otqw18e8nh5nty&' +
                    '_limit=' + RESULTS_LIMIT + '&' +
                    'listing_id=' + id + '&role=all')
                    .then(function (result) {
                        return result.data.reviews;
                    });
            },
            
        };

        return Service;
    }]);
