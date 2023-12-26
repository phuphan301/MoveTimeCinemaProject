let host = "http://localhost:8080/api/booking";
let host_customer = "http://localhost:8080/api";
const app = angular.module("app", []);
app.controller("controller", function ($scope, $http) {
  $scope.booking = [];
  $scope.getBooking = function () {
    var url = `${host}/all`;
    $http.get(url).then(resp => {
      $scope.booking = resp.data;

      $scope.selectedStatus = "all";

      // Function to update the chart based on filters
      $scope.updateChart = function () {
        // Filter data based on date and status
        var filteredData = resp.data.filter(function (item) {
          var isStatusMatch =
            $scope.selectedStatus === "all" ||
            item.status === $scope.selectedStatus;
          return isStatusMatch;
        });

        // Calculate total revenue for each date
        var revenueData = {};
        filteredData.forEach(function (item) {
          var date = item.date;
          var price = item.price || 0;
          revenueData[date] = (revenueData[date] || 0) + price;
        });
        console.log("revenueData", revenueData)

        // Extract dates and revenue for Chart.js
        var chartLabels = Object.keys(revenueData);
        var chartData = chartLabels.map(function (date) {
          return revenueData[date];
        });

        console.log("chartLabels", chartLabels)

        // Create or update the chart using Chart.js
        if ($scope.myChart) {
          // If chart already exists, update its data
          $scope.myChart.data.labels = chartLabels;
          $scope.myChart.data.datasets[0].data = chartData;
          $scope.myChart.update();
        } else {
          // If chart doesn't exist, create a new chart
          var ctx = document.getElementById("myChart").getContext("2d");
          $scope.myChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: chartLabels,
              datasets: [
                {
                  label: "Tổng doanh thu",
                  data: chartData,
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      };
      // Initial chart rendering
      $scope.updateChart();



      // Tổ chức dữ liệu
      var roomCounts = {};
      resp.data.forEach(function (booking) {
        var roomId = booking.id_MOVIE_SCHEDULED.id_ROOM.id;
        roomCounts[roomId] = (roomCounts[roomId] || 0) + 1;
      });

      // Tính phần trăm
      var totalCount = resp.data.length;
      $scope.percentageData = Object.keys(roomCounts).map(function (roomId) {
        return {
          roomId: roomId,
          percentage: (roomCounts[roomId] / totalCount) * 100
        };
      });

      // Cấu hình biểu đồ
      var ctx = document.getElementById('myPieChart').getContext('2d');
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: $scope.percentageData.map(function (item) {
            return "Room " + item.roomId;
          }),
          datasets: [{
            data: $scope.percentageData.map(function (item) {
              return item.percentage;
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(60, 255, 37, 0.6)',
              'rgba(196, 203, 37, 0.6)',
              'rgba(196, 86, 37, 0.6)',
              'rgba(118, 96, 37, 0.6)',
              'rgba(118, 96, 115, 0.6)',
              'rgba(50, 96, 115, 0.6)',
            ]
          }]
        }
      });


      var movieRevenueMap = {};
      resp.data.forEach(function (item) {
        var movieName = item.id_MOVIE_SCHEDULED.id_MOVIE.name;
        var revenue = item.price;

        if (movieRevenueMap[movieName]) {
          movieRevenueMap[movieName] += revenue;
        } else {
          movieRevenueMap[movieName] = revenue;
        }
      });
      $scope.movieNames = Object.keys(movieRevenueMap);
      $scope.totalRevenues = Object.values(movieRevenueMap);
      $scope.chartConfig = {
        type: 'line',
        data: {
          labels: $scope.movieNames,
          datasets: [{
            label: 'Total Revenue',
            data: $scope.totalRevenues,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };

      angular.element(document).ready(function () {
        var ctx = document.getElementById('revenueChart').getContext('2d');
        new Chart(ctx, $scope.chartConfig);
      });

    })
  }

  $scope.avt = {};
  $scope.loadInfoCustomer = function () {
    var url = `${host_customer}/customer/edit`
    $http.get(url)
      .then(function (response) {
        // Gán dữ liệu người dùng vào $scope.form
        $scope.avt = response.data;
      })
      .catch(function (error) {
        console.error('Error fetching user info:', error);
      });
  };


  $scope.loadInfoCustomer();
  $scope.getBooking();
});