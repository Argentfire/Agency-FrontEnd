(function() {


    var agency = function($http) {
        var getJourneys = function() {
            return $http.get("https://localhost:7084/Journey")
                        .then(function(response) {
                            return response.data;
                        });
        };
        var getJourney = function(journeyId) {
            return $http.get("https://localhost:7084/Journey/" + journeyId)
                        .then(function(response) {
                            return response.data;
                        });
        };
        var getTickets = function() {
            return $http.get("https://localhost:7084/Ticket")
                        .then(function(response) {
                            return response.data;
                        });
        };
        var getTicket = function(ticketId) {
            return $http.get("https://localhost:7084/Ticket/" + ticketId)
                        .then(function(response) {
                            return response.data;
                        });
        };
        var getVehicles = function() {
            return $http.get("https://localhost:7084/Vehicle")
                        .then(function(response) {
                            return response.data;
                        });
        };
        var getVehicle = function(vehicleId) {
            return $http.get("https://localhost:7084/Vehicle/" + vehicleId)
                        .then(function(response) {
                            return response.data;
                        });
        };

        return {
            getJourneys: getJourneys,
            getJourney: getJourney,
            getTickets: getTickets,
            getTicket: getTicket,
            getVehicles: getVehicles,
            getVehicle: getVehicle
        };
    };


    var module = angular.module("Agency");
    module.factory("agency", agency);
}());