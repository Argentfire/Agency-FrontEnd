(function() { 
    var module = angular.module("Agency");

    var TicketController = function($scope, agency) {
        $scope.minPrice = 0;
        $scope.maxPrice = 100;

        var journeys;
        var vehicles;

        var HandleJourneyData = function(data) { 
            $scope.journeys = data;
            journeys = data;
        }

        var HandleVehicleData = function(data) {
            $scope.vehicles = data;
            vehicles = data;
        }

        $scope.LowerTicketCount = function(e) {
            var elem = angular.element(e.srcElement);
            var triggerType = elem.attr('id');
            var parentEle = document.getElementById(triggerType).parentElement;
            var par = elem.attr("parent");
            // console.log(triggerType);
            var foo = parentEle.parentElement;
            var ticket = angular.element(foo);
            var ticketCountLabel = angular.element(document.querySelector("#lblTicketCount"));
            var ticketCount = ticketCountLabel.text();
            console.log(ticketCount);
            // var ticketCount.text();
            if(ticketCount.text() >= 1) {
                ticketCount.text();
            }
        }

        $scope.RaiseTicketCount = function(e) {
            var elem = angular.element(e.srcElement);
            var triggerType = elem.attr('id');
            var parentEle = document.getElementById(triggerType).parentElement;

            var ticketCount = parentEle.getElementsByClassName("journeyTicketCount")[0];

            alert(ticketCount.textContent);
            
        }

        $scope.AddToCart = function (e) {
            var elem = angular.element(e.srcElement);
            var triggerType = elem.attr('id');
            var parentEle = document.getElementById(triggerType).parentElement;
            // var parentEle = GetParentElement(elem);

            var ticketCount = parentEle.getElementsByClassName("journeyTicketCount")[0];

            alert(ticketCount.textContent);
        }

        function GetParentElement(elem) {
            var triggerType = elem.attr('id');
            var parent = document.getElementById(triggerType).parentElement;

            return parent;
        }

        function GetTicketCard(element) {

        }

        $scope.QueryVehicle = function(vehicleID) {
            for(var veh of vehicles) {
                if(veh.vehicleID === vehicleID)
                    return veh;
            }
        }

        $scope.GetVehicleImage = function(veh) {
            var html = "./assets/images/image_";
            veh = "" + veh;
            if(veh.includes("Boat")) html += "boat.png";
            else if(veh.includes('Airplane')) html += "plane.jpeg";
            else if(veh.includes('Train')) html += "train.jpg";
            else if(veh.includes('Bus')) html += "bus.jpg";
            return html;
        }
        function percentage(percent, total) {
            return ((percent/ 100) * total).toFixed(2);
        }

        agency.getDataArray("Journey").then(HandleJourneyData);
        agency.getDataArray("Vehicle").then(HandleVehicleData);
    }; 

    module.controller("TicketController", TicketController);
}());  