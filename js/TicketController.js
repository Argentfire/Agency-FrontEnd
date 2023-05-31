(function() { 
    var module = angular.module("Agency");

    var TicketController = function($scope, $http, $injector) {
        $scope.minPrice = 0;
        $scope.maxPrice = 100;

        var journeys;
        var vehicles;

        var HandleJourneyData = function(response) { 
            $scope.journeys = response.data;
            journeys = response.data;
            // DisplayTicketOptions(response.data);
        }

        var HandleVehicleData = function(response) {
            $scope.vehicles = response.data;
            vehicles = response.data;
        }

        var DisplayTicketOptions = function(data) {
            var html = "";
            var doc = document.getElementById("ticketsList");
            for(var i = 0; i < data.length; i++) {
                var journey = data[i];
                var veh = ReturnVehicleData(journey.vehicleModel);
                var addInfo = journey.vehicleModel.split("\n")[4];
                html += 
                "<div class='ticketElement'>" +
                    "<div class='tripData'>" +
                        veh + "<h5>" +
                        "From: " + journey.startLocation + "<br>" +
                        "Destination: " + journey.destination + "<br>" +
                        "Price: " + (journey.distance * QueryVehicle(journey.vehicleID).pricePerKilometer) + " BGN<br>" +  
                    "</h5></div>" +
                    "<div class='ticketControls'>" +
                        "<input class='ticketCountButtonSubtr' type='button' value='-'>" +
                        "<label class='journeyTicketCount'> 1 </label>" +
                        "<input class='ticketCountButtonAdd' type='button' value='+'>" +
                    "</div>" +
                    "<button id='btnAddToCart" + i + "' class='addToCart' type='submit'>" + 
                    "<img src='./assets/images/cart_add.svg' width='27px'>" +
                        " Add to Cart" +
                    "</button>" +
                "</div>";
            }
            doc.innerHTML = html;
            AddToCartClickEvent();
            LowerTicketCountClickEvent();
            RaiseTicketCountClickEvent();
        }

        var LowerTicketCount = function(e) {
            var elem = angular.element(e.srcElement);
            var triggerType = elem.attr('id');
            var parentEle = document.getElementById(triggerType).parentElement;
        }

        var RaiseTicketCount = function(e) {
            var elem = angular.element(e.srcElement);
            var triggerType = elem.attr('id');
            var parentEle = document.getElementById(triggerType).parentElement;

            var ticketCount = parentEle.getElementsByClassName("journeyTicketCount")[0];

            alert(ticketCount.textContent);
            
        }

        var AddToCart = function (e) {
            var elem = angular.element(e.srcElement);
            var triggerType = elem.attr('id');
            var parentEle = document.getElementById(triggerType).parentElement;
            // var parentEle = GetParentElement(elem);

            var ticketCount = parentEle.getElementsByClassName("journeyTicketCount")[0];

            alert(ticketCount.textContent);
        }

        function LowerTicketCountClickEvent() {
            var buttons = document.getElementsByClassName("ticketCountButtonSubtr");
            for(var btn of buttons) {
                btn.addEventListener("click", LowerTicketCount);
            }
        }

        function RaiseTicketCountClickEvent() {
            var buttons = document.getElementsByClassName("ticketCountButtonAdd");
            for(var btn of buttons) {
                btn.addEventListener("click", RaiseTicketCount);
            }
        }

        function AddToCartClickEvent() {
            var buttons = document.getElementsByClassName("addToCart");
            for(var btn of buttons) {
                btn.addEventListener("click", AddToCart);
            }
        }

        function GetParentElement(elem) {
            var triggerType = elem.attr('id');
            var parent = document.getElementById(triggerType).parentElement;

            return parent;
        }

        function QueryVehicle(vehicleID) {
            for(var veh of vehicles) {
                if(veh.vehicleID === vehicleID)
                    return veh;
            }
        }

        function ReturnVehicleData(veh) {
            var html = "<img src='./assets/images/image_";
            veh = "" + veh;
            if(veh.includes("Boat")) html += "boat.png";
            else if(veh.includes('Airplane')) html += "plane.jpeg";
            else if(veh.includes('Train')) html += "train.jpg";
            else if(veh.includes('Bus')) html += "bus.jpg";
            
            html += "' width='190px' height='125px'>";
            return html;
        }
        function percentage(percent, total) {
            return ((percent/ 100) * total).toFixed(2);
        }

        $http.get("https://localhost:7084/Journey").then(HandleJourneyData);
        $http.get("https://localhost:7084/Vehicle").then(HandleVehicleData);
    }; 

    module.controller("TicketController", TicketController);
}());  