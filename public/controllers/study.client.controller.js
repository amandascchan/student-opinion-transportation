'use strict';

var myApp = angular.module('Study', ['underscore']);

myApp.controller('StudyController', ['$scope', function($scope) {
    $scope.hello = 'helleeeee';

}]);

myApp.service('initialization', function($http) {
    this.getPhoneText = $http.get('/listOfAllPhones.txt').success(function(data, status) {
        if (data && status === 200) return data
    });
    
    this.getPhoneImages = $http.get('/phoneImages2.txt').success(function(data, status) {
        if(data && status == 200) return data 
    });
    return this;
});
function UserCtrl($scope, $http, initialization) {
    $scope.phoneText = [];
    $scope.phoneImages = [];
    $scope.imageText = {};
    $scope.revisedText = [];
    
    $scope.init = function() {
        initialization.getPhoneText.then(function(data){
            $scope.phoneText = data.data.split('\n');
        });
        initialization.getPhoneImages.then(function(data){
            $scope.phoneImages = data.data.split('\n');
            $scope.updatePhoneValues();    
        });
    }
    $scope.updatePhoneValues = function () {
        if($scope.phoneText.length > 0 && $scope.phoneImages.length > 0) {
            for(var i = 0; i < $scope.phoneImages.length; i++) {
                var phoneStr = $scope.phoneImages[i];
                phoneStr = phoneStr.substring(0, phoneStr.length - 4);
                phoneStr = phoneStr.replace(/_/g, ' ');
                if(_.indexOf($scope.phoneText, phoneStr) === -1) {
                    $scope.phoneImages.splice(i, 1);
                    $scope.phoneText.splice(i, 1);
                }
                else {
                    $scope.revisedText.push(phoneStr);
                    $scope.imageText[phoneStr] = {};
                    $scope.imageText[phoneStr].name = phoneStr;
                    $scope.imageText[phoneStr].carrier = 'lol';
                    $scope.imageText[phoneStr].image = $scope.phoneImages[i];
                    $scope.imageText[phoneStr].selected = false;
                }
            }
        }
    }
    $scope.whenClicked = function (phone) {
        $scope.selectedItem = phone.name;
        _.forEach($scope.imageText, function(remainPhone) {
            if(remainPhone.name !== $scope.selectedItem && document.getElementById(remainPhone.name) !== null) {
                document.getElementById(remainPhone.name).style.background = "#FFF3ED";
                remainPhone.selected = false;
            }
        });
        var color;
        if(phone.selected) {
            color = "#FFF3ED";
            $scope.selectedItem = undefined;
        }
        else color = "blue";
        $scope.imageText[phone.name].selected = !$scope.imageText[phone.name].selected;
        document.getElementById(phone.name).style.background = color;
    }
};
