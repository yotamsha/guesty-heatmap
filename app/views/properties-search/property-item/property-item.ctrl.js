/**
 * Created by yotam on 16/05/2017.
 */
angular.module('myApp.properties-search')
    .controller('PropertyItemCtrl', ['$scope', '$mdDialog', 'propertyData', 'AirbnbAPIService',
        function ($scope, $mdDialog, propertyData, AirbnbAPIService) {
            var ctrl = this;
            ctrl.dataLoaded = false;
            ctrl.reviews = [];
            ctrl.propertyData = propertyData.listing;
            AirbnbAPIService.getReviewsById(ctrl.propertyData.id).then(function(data){
                ctrl.reviews = data;
                ctrl.dataLoaded = true;
            });
            ctrl.close = function() {
                $mdDialog.hide();
            };
        }]);

