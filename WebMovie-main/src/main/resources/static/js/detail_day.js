let host="http://localhost:8080/api/cinema";

angular.module('dateApp', [])
    .controller('DateController', function ($scope) {
		
        $scope.startDate = new Date('2023-10-25'); // Replace with your start date
        $scope.endDate = new Date('2023-11-05');   // Replace with your end date

        $scope.generateDateRange = function (startDate, endDate) {
            const dateRange = [];
            let currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                dateRange.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return dateRange;
        };

        $scope.dateRange = $scope.generateDateRange($scope.startDate, $scope.endDate);
    });