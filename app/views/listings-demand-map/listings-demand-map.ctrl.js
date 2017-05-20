'use strict';

angular.module('myApp.listings-demand-map', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/listings-demand-map/listings-demand-map.html',
            controller: 'ListingsDemandMapCtrl',
            controllerAs: 'ctrl',
            reloadOnSearch : false
        });
    }])

    .controller('ListingsDemandMapCtrl', ['AirbnbAPIService','DemandMapDataService',
        function (AirbnbAPIService, DemandMapDataService) {
            var ctrl = this;
            ctrl.selectedLocation = 'San Francisco';
            ctrl.dataLoaded = false;
            
            function _init(){
                AirbnbAPIService.getListingsByLocation(ctrl.selectedLocation).then(function(data){
                    DemandMapDataService.initMap(DemandMapDataService.getMapDataForListings(data));
                    ctrl.dataLoaded = true;
                });
            }
            _init();

        }]);
