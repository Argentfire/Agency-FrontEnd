(function() { 
    var module = angular.module("Agency");

    var TicketController = function($scope, agency) {
        $scope.minPrice = 0;
        $scope.maxPrice = 100;
        $scope.transactionStatus = "";
        var journeys;
        var vehicles;
        const tickets = [];

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
            var ticketCardIdx = GetNumberFromString(elem.attr('id'));
            var ticketCountLabel = document.getElementById(`lblTicketCount${ticketCardIdx}`);
            console.log(ticketCountLabel.id);
            var ticketCount = Number(ticketCountLabel.textContent);
            if(ticketCount >= 1) {
                ticketCountLabel.textContent = ticketCount - 1;
            }
        }

        $scope.RaiseTicketCount = function(e) {
            var elem = angular.element(e.srcElement);
            var ticketCardIdx = GetNumberFromString(elem.attr('id'));
            var ticketCountLabel = document.getElementById(`lblTicketCount${ticketCardIdx}`);
            console.log(ticketCountLabel.id);
            var ticketCount = Number(ticketCountLabel.textContent);
            if(ticketCount < 10) {
                ticketCountLabel.textContent = ticketCount + 1;
            }
            
        }

        $scope.AddToCart = function (e) {
            try {
                var elem = angular.element(e.srcElement);
                var ticketCardIdx = GetNumberFromString(elem.attr('id'));
                var journeyDetails = document.getElementById(`journey-details${ticketCardIdx}`);
                var ticketCountLabel = document.getElementById(`lblTicketCount${ticketCardIdx}`);
                console.log(ticketCountLabel.id);
                var ticketCount = Number(ticketCountLabel.textContent);
                let jrny = journeys[ticketCardIdx];
                let jrnyPrice = 0;
                const regex = /Price: (\d+)/;
                const matches = journeyDetails.innerText.match(regex);
                if (matches && matches.length > 1) {
                    jrnyPrice = parseInt(matches[1]);
                }
                
                let ticket = new Ticket(jrny.startLocation, jrny.destination, jrny.distance, jrnyPrice, ticketCount);
                tickets.push(ticket);
                
                console.clear();
                console.log(tickets);
            } catch (err) {
                alert("An error ocurred!\nPlease alert developers!");
            }
        }

        $scope.finishOrder = function(e) {

        }

        $scope.clearCart = function(e) {

        }

        function GetNumberFromString(str)
        {
            if(str == null) return "";
            return str.replace(/\D/g, '');
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

        agency.getDataArray("Journey").then(HandleJourneyData);
        agency.getDataArray("Vehicle").then(HandleVehicleData);
    }; 

    module.controller("TicketController", TicketController);
}());  