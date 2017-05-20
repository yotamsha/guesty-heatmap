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
            ctrl.selectedLocation = null;
            ctrl.cities = [ 'London', 'Paris', 'Tel Aviv', 'NYC']


            ctrl.locationChanged = function () {
                AirbnbAPIService.getListingsByLocation(ctrl.selectedLocation).then(function(data){
                    ctrl.listings = data;
                });
            };
            
            ctrl.openModal = function(propertyData){
                $mdDialog.show({
                    controller: 'PropertyItemCtrl',
                    locals: {
                        propertyData: propertyData
                    },
                    controllerAs: 'ctrl',
                    templateUrl: 'views/properties-search/property-item/property-item.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose:true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                });
            };

        }]);
