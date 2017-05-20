/**
 * Created by yotam on 22/12/2016.
 */
angular.module('myApp.services')
    .service('AirbnbAPIService', ['$http', '$q', function ($http, $q) {
        var RESULTS_LIMIT = 1000; // This is the current max Airbnb allows for this API call.
        var PAGE_LIMIT = 50;
        var PAGES_IN_BATCH = RESULTS_LIMIT / PAGE_LIMIT;
        var API_PREFIX = 'https://api.airbnb.com/v2';

        function _getListingsPagesBatch(location) {
            var requests = [];
            for (var i = 0; i < PAGES_IN_BATCH; i++) {
                requests.push(_getListingsPageByLocation(location, i * PAGE_LIMIT));
            }
            return $q.all(requests);
        }

        function _getListingsPageByLocation(location, offset) {
            return $http.get(API_PREFIX + '/search_results?' +
                'client_id=3092nxybyb0otqw18e8nh5nty&' +
                '_limit=' + PAGE_LIMIT + '&' +
                '_offset=' + offset + '&' +
                'location=' + location)
                .then(function (result) {
                    return result.data.search_results;
                });
        }


        var Service = {
            getListingsByLocation: function (location) {
                return _getListingsPagesBatch(location).then(function (results) {
                    var mergedResults = [].concat.apply([], results);
                    return mergedResults
                });

            }

        };

        return Service;
    }]);
