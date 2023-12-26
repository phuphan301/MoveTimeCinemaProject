let host_movie_scheduled = "http://localhost:8080/api/movie_scheduled";
let host_movie = "http://localhost:8080/api/movie";
let host_customer = "http://localhost:8080/api";
const app = angular.module("app", []);
app.controller("controller", function ($scope, $http, $filter) {
    $scope.form = {};

    $scope.movie_scheduleds = [];
    $scope.movie_scheduleds_all = [];
    $scope.movies = [];
    $scope.movie_scheduledsbyId = [];


    $scope.upcomingMovies = [];


    $scope.loadUpcomingMovies = function () {
        var url = `${host_movie_scheduled}/all`;
        $http.get(url).then(resp => {
            // Filter out movies with status = false
            const upcomingMovies = resp.data.filter(item => item.status !== false);

            // Create a dictionary to store unique movies based on id_MOVIE
            const uniqueMovies = {};

            // Loop through the upcomingMovies to group by id_MOVIE
            upcomingMovies.forEach(movieScheduled => {
                const idMovie = movieScheduled.id_MOVIE.id;

                if (!uniqueMovies[idMovie]) {
                    uniqueMovies[idMovie] = {
                        id: idMovie,
                        image: movieScheduled.id_MOVIE.image,
                        name: movieScheduled.id_MOVIE.name,
                        gerne: movieScheduled.id_MOVIE.gerne,
                        age: movieScheduled.id_MOVIE.age,
                        time:  movieScheduled.id_MOVIE.time, 
                        schedule: {}
                    };
                }

                const date = movieScheduled.date;
                const time = movieScheduled.time_START;

                // Create an array for each date if it doesn't exist
                if (!uniqueMovies[idMovie].schedule[date]) {
                    uniqueMovies[idMovie].schedule[date] = [];
                }

                // Add time to the array for the date
                uniqueMovies[idMovie].schedule[date].push(time);
            });

            // Sort the schedule for each movie by date
            Object.values(uniqueMovies).forEach(movie => {
                Object.keys(movie.schedule).forEach(date => {
                    movie.schedule[date].sort();
                });
            });

            // Sort movies based on the first date in their schedule
            $scope.upcomingMovies = Object.values(uniqueMovies).sort((a, b) => {
                const dateA = Object.keys(a.schedule)[0];
                const dateB = Object.keys(b.schedule)[0];
                return new Date(dateA) - new Date(dateB);
            });

            console.log("Upcoming Movies", $scope.upcomingMovies);
        }).catch(error => {
            console.log("Error", error);
        });
    };


    $scope.loadAllMovies = function () {
        var url = `${host_movie}/all`;
        $http.get(url).then(resp => {
            $scope.movies = resp.data;
            console.log("AllMovies", resp);
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


    $scope.loadUpcomingMovies();
    $scope.loadAllMovies();

});