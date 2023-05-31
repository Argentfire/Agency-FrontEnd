(function() {


    var agency = function($http) {

        var getDataArray = function(model) {
            return $http.get(`https://localhost:7084/${model}`)
                        .then(function(response) {
                            return response.data;
                        });
        };
        var getDataElement = function(model, id) {
            return $http.get(`https://localhost:7084/${model}/${id}`)
                        .then(function(response) {
                            return response.data;
                        });
        };

        return {
            getDataArray: getDataArray,
            getDataElement: getDataElement
        };
    };


    var module = angular.module("Agency");
    module.factory("agency", agency);
}());