(function() {
    var module = angular.module("Agency");

    var JourneyController = function($scope, $http, $injector) {
        
        var journeys = [];
        var onJourneysComplete = function(response) {
            $scope.journeys = response.data;
            journeys = response.data;
            
            var destinations = [];
            for(var item of response.data) {
                if(destinations.includes(item.destination) == false)
                {
                    destinations.push(item.destination);
                }
            }
            $scope.destinations = destinations;
            AddFilterDestBtnsClickEvent();
        }

        $scope.testFunc = function()
        {
            var elem = angular.element(e.srcElement);
            var triggerType = elem.attr('id');

            var veh = triggerType.replace("btn", "");

            let filteredJourneys = [];
            if(veh.includes("All")) {
                DisplayJourneys(journeys);
                return;
            } 
            else {
                for(var i of journeys) {
                    if(i.vehicleModel.includes(veh))
                        filteredJourneys.push(i);
                }
            }
        }

        var filterDest = function(e) {
            var elem = angular.element(e.srcElement);
            var triggerType = elem.attr('id');
            console.log(triggerType);
            var dest = triggerType.replace("btnDest", "");
            var iJourneys = document.getElementsByClassName("journeyData");
            for(var i of iJourneys)
                i.style.display = "block";
            if(dest.includes("All") == false) {
                for(var i = 0; i < iJourneys.length; i++) {
                    if(iJourneys[i].innerHTML.includes("Destination: " + dest) == false) iJourneys[i].style.display = "none";
                }
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

        function GenerateDestinationFilters(data) {
            var html = "<label>Destinations</label><hr width'=100%'>" + 
            "<input id='btnDestAll' class='destination-filter-button' type='button' value='All'></input>";
            var destinations = [];
            for(var item of data) {
                if(destinations.includes(item.destination) == false)
                {
                    destinations.push(item.destination);
                }
            }

            for(var item of destinations) {
                html += "<input id='btnDest"+ item + "' class='destination-filter-button' type='button' value='" + item + "'></input>";
            }
            document.getElementById("destinationsFilter").innerHTML = html;
        }
        function AddFilterDestBtnsClickEvent() {
            var buttons = document.getElementsByClassName("destination-filter-button");
            for(var btn of buttons) {
                btn.addEventListener("click", filterDest);
            }
        }

        $http.get("https://localhost:7084/Journey").then(onJourneysComplete);
    };

    module.controller("JourneyController", JourneyController);
// elem.css('background', 'blue'); <- Way to set element style property via function
}());