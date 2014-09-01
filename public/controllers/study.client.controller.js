'use strict';

var myApp = angular.module('Study', ['underscore', 'ui.slider']);

myApp.service('initialization', function($http) {
    this.getPhoneText = $http.get('/listOfAllPhones.txt').success(function(data, status) {
        if (data && status === 200) return data
    });
    
    this.getPhoneImages = $http.get('/phoneImages2.txt').success(function(data, status) {
        if(data && status == 200) return data 
    });
    return this;
});

function StudyController($scope, $http, initialization){
    $scope.sliderValue = 2;
    $scope.phoneText = [];
    $scope.phoneImages = [];
    $scope.imageText = {};
    $scope.revisedText = [];
    $scope.checkBox = {};
    $scope.checkBox.yes = true;
    $scope.sliderOptions = ['never', 'once or twice a term', 'once or twice a week','everyday'];
    $scope.calculateValue = function(value) {
        var finalValue = Math.round(value);
        return finalValue;
    };
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
                remainPhone.selected = false;
            }
        });
        if(phone.selected) {
            $scope.selectedItem = undefined;
        }
        $scope.imageText[phone.name].selected = !$scope.imageText[phone.name].selected;
    }

}