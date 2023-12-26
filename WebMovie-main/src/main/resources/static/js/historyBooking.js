let host_booking = "http://localhost:8080/api/booking";
let host_movie_scheduled = "http://localhost:8080/api/movie_scheduled";
const app = angular.module("app", []);

app.controller("controller", function($scope, $http, $filter) {
	$scope.movie_scheduleds = [];
	$scope.userId = [];

	var userIdLogin = '';;
	$scope.loadIdUserLogin = function() {
		$http.get('http://localhost:8080/api/getUserId').then(function(response) {
			$scope.userId = response.data;
			userIdLogin = $scope.userId;
			$scope.getAllBookingByCustomer(userIdLogin);
			console.log('idUserLogin', userIdLogin);
		});
	}
	$scope.loadIdUserLogin();
	
	$scope.BookingByIdCustomer = [];
	$scope.getAllBookingByCustomer = function(userIdLogin){
		var url = `${host_booking}/profile/${userIdLogin}`;
		$http.get(url).then(resp =>{
			$scope.BookingByIdCustomer = resp.data;
			console.log("getAllBookingByCustomer",resp.data);
		})
	}
	$scope.loadAllMovie_Scheduleds = function () {
		var url = `${host_movie_scheduled}/all`;
		$http.get(url).then(resp => {
			$scope.movie_scheduleds = resp.data;
			console.log("Allmovie_scheduleds", resp);
		}).catch(error => {
			console.log("Error", error);
		})
	}

	    // =========================SEARCH BY USER================================
		$scope.searchQuery = '';
		$scope.searchResults = [];
	
		// Lọc danh sách movie_scheduleds theo name và ngày hiện tại trở đi
		$scope.searchMovie = function () {
			var currentDate = new Date();
	
			// Kiểm tra nếu chuỗi tìm kiếm trống hoặc có ít hơn 3 ký tự
			if ($scope.searchQuery.trim().length < 1) {
				$scope.searchResults = [];
				$scope.searchMessage = "";
			} else {
	
        // Lọc danh sách movie_scheduleds theo name và status=true
        $scope.searchResults = $filter('filter')($scope.movie_scheduleds, function (movie) {
            return movie.id_MOVIE.name.toLowerCase().includes($scope.searchQuery.toLowerCase()) && movie.status;
        });
				// console.log("searchResults", $scope.searchResults);
	
				// xoa id_Movie trung
				var uniqueMovies = {};
				$scope.searchResults = $scope.searchResults.filter(function (movie) {
					if (!uniqueMovies[movie.id_MOVIE.id]) {
						uniqueMovies[movie.id_MOVIE.id] = true;
						return true;
					}
					return false;
				});
	
				// Kiểm tra và đặt thông báo
				if ($scope.searchResults.length > 0) {
					$scope.searchMessage = $scope.searchQuery;
				} else {
					$scope.searchMessage = "Không có kết quả tìm kiếm cho: " + $scope.searchQuery;
				}
			};
			// console.log("searchResults (after removing duplicates)", $scope.searchResults);
		};
	
		// =========================END SEARCH BY USER================================

	$scope.loadAllMovie_Scheduleds();
});