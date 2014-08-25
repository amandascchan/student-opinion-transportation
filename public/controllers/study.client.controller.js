'use strict';

var myApp = angular.module('Study', ['underscore']);

myApp.controller('StudyController', ['$scope', function($scope) {
    $scope.hello = 'helleeeee';

}]);

function Main($scope) {
    $scope.items = [];
     
    var counter = 0;
    $scope.loadMore = function() {
        for (var i = 0; i < 10; i++) {
            $scope.items.push({id: counter});
            counter += 5;
        }
    };     
    $scope.loadMore();
}

function UserCtrl($scope, $http) {
    $scope.phoneText = [];
    $scope.phoneImages = [];
    $scope.imageText = {};
    $http.get('/listOfAllPhones.txt').success(function(data, status, headers, config) {
        if (data && status === 200) {
            $scope.phoneText = data.split('\n');
        }
    });
    $http.get('/phoneImages.txt').success(function(data, status, headers, config) {
        if(data && status == 200) {
            $scope.phoneImages = data.split('\n');
            $scope.updatePhoneValues();
        }
    });
    $scope.updatePhoneValues = function () {
        if($scope.phoneText.length > 0 && $scope.phoneImages.length > 0) {
            for(var i = 0; i < $scope.phoneImages.length; i++) {
                var phoneStr = $scope.phoneImages[i];
                phoneStr = phoneStr.substring(0, phoneStr.length - 4);
                phoneStr = phoneStr.replace(/_/g, ' ');
                if(_.indexOf($scope.phoneText, phoneStr) === -1) {
                    $scope.phoneImages.splice(i, 1);
                }
                else {
                    $scope.imageText = $scope.imageText || {};
                    $scope.imageText[phoneStr] = $scope.phoneImages[i];
                }
            }
        }
    }
};


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

