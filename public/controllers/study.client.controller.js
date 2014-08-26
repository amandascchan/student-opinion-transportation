'use strict';

var myApp = angular.module('Study', ['underscore']);

myApp.controller('StudyController', ['$scope', function($scope) {
    $scope.hello = 'helleeeee';

}]);

function UserCtrl($scope, $http) {
    $scope.phoneText = [];
    $scope.phoneImages = [];
    $scope.imageText = {};
    $scope.init = function() {
        $http.get('/listOfAllPhones.txt').success(function(data, status, headers, config) {
            if (data && status === 200) {
                $scope.phoneText = data.split('\n');
            }
        });
        $http.get('/phoneImages2.txt').success(function(data, status, headers, config) {
            if(data && status == 200) {
                $scope.phoneImages = data.split('\n');
                $scope.updatePhoneValues();
            }
        });
    }
    $scope.updatePhoneValues = function () {
        if($scope.phoneText.length > 0 && $scope.phoneImages.length > 0) {
            for(var i = 0; i < $scope.phoneImages.length; i++) {
                var phoneStr = $scope.phoneImages[i];
                phoneStr = phoneStr.substring(0, phoneStr.length - 4);
                phoneStr = phoneStr.replace(/_/g, ' ');
                console.log(phoneStr);
                if(_.indexOf($scope.phoneText, phoneStr) === -1) {
                    $scope.phoneImages.splice(i, 1);
                }
                else {
                    $scope.imageText[i] = {};
                    $scope.imageText[i].name = phoneStr;
                    $scope.imageText[i].carrier = 'lol';
                     $scope.imageText[i].image = $scope.phoneImages[i];
                    console.log($scope.imageText[i]);
                }
            }
        }
    }

};
