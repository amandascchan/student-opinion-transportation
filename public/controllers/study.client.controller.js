'use strict';

var myApp = angular.module('Study', []);

myApp.controller('StudyController', ['$scope', function($scope) {
    $scope.hello = 'helleeeee';

}]);

function Main($scope) {
    $scope.items = [];
     
    var counter = 0;
    $scope.loadMore = function() {
        for (var i = 0; i < 10; i++) {
            $scope.items.push({id: counter});
            counter += 10;
        }
    };
    $scope.loadImages = function() {

    };
     
    $scope.loadMore();
}


myApp.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
         
        elm.bind('scroll', function() {
            if (raw.scrollLeft + raw.offsetWidth >= raw.scrollWidth) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});
