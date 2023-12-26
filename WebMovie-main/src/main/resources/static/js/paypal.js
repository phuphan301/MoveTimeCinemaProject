let host_booking = "http://localhost:8080/api/booking";
let host_pay = "http://localhost:8080/api/pay";
const app = angular.module("app", []);
app.controller("controller", function ($scope, $http, $filter) {
    // $scope.updateStatusBookingByIdExistsTablePay = function(){
    //     $http.get('http://localhost:8080/api/booking/updateStatusBookingByIdExistsTablePay').then((resp) => {
    //         console.log("pay", resp.data);
    //     });
    // }

    $scope.pay = function () {
        var url = `${host_pay}/all`;
        $http.get(url).then((resp) => {
            $http.get('http://localhost:8080/api/booking/updateStatusBookingByIdExistsTablePay').then((resp) => {
                console.log("pay", resp.data);
            });
        });
    };
    $scope.pay();

    
    $scope.userId = [];
    var userIdLogin = '';;


	$scope.loadIdUserLogin = function () {
		$http.get('http://localhost:8080/api/getUserId').then(function (response) {
			$scope.userId = response.data;
			userIdLogin = $scope.userId;
			console.log('idUserLogin', userIdLogin);
			window.location.href = `http://localhost:8080/historyBooking/` + userIdLogin
		});
	}
    
})