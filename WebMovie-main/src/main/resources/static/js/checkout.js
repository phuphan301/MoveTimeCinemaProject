let host_seatScheduled = "http://localhost:8080/api/seat_scheduled";
let host_booking = "http://localhost:8080/api/booking";
let host_pay = "http://localhost:8080/api/pay";
let host_voucher = "http://localhost:8080/api/voucher";
let host_movie_scheduled = "http://localhost:8080/api/movie_scheduled";
const app = angular.module("appBooking", []);

app.controller("controllerBooking", function ($scope, $http, $interval, $timeout, $filter) {
	var url = window.location.href;
	var parts = url.split('/'); // Tách URL bằng dấu '/'
	var idBooking = parts[parts.length - 1];

	$scope.idBooking = idBooking;
	console.log("idBooking", idBooking);

	$scope.seat_scheduled = [];
	$scope.booking = [];

	$scope.stopClock = function () {
		if (intervalPromise) {
			$interval.cancel(intervalPromise);
		}
	}

	$scope.getBookingId = function (idBooking) {
		var url = `${host_booking}/v1/${idBooking}`;
		$http.get(url).then(resp => {

			if (resp.data && resp.data.startTime) {
				$scope.booking.push(resp.data);
				console.log("booking", resp.data);

				// Chuyển đổi chuỗi startTime thành đối tượng Date
				$scope.invoiceTime = new Date(resp.data.startTime);

				if (resp.data.status === "success") {
					$scope.elapsedTime = "Payment completed";
				} else if (resp.data.status === "failed") {
					$scope.elapsedTime = "Payment failed";
				} else {
					intervalPromise = $interval(function () {
						$scope.currentTime = new Date();

						// Kiểm tra xem currentTime và invoiceTime có phải là đối tượng Date hợp lệ hay không
						if (!isNaN($scope.currentTime) && !isNaN($scope.invoiceTime)) {
							// Tính thời gian đã trôi qua từ thời điểm tạo hóa đơn
							var elapsedTimeMilliseconds = $scope.currentTime - $scope.invoiceTime;
							$scope.elapsedTime = formatElapsedTime(elapsedTimeMilliseconds);

							// Kiểm tra nếu thời gian đã trôi qua lớn hơn 15 phút
							if (elapsedTimeMilliseconds > 1 * 60 * 1000) { 
								// Hiển thị cảnh báo và dừng cập nhật thời gian
								$scope.elapsedTime = "Hết giờ";
								$interval.cancel(intervalPromise);
								$timeout(function () {
									//update status booking
									$http.get(`${host_booking}/updateFailed/${idBooking}`).then(resp => {
										console.log("updateFailed", resp.data);
										location.reload();
									})
								});
							}
						}
					}, 1000);
				}
				// Cập nhật thời gian hiện tại mỗi giây

				console.log(resp.data.status);
			}
		});
	}
	// Hàm chuyển đổi thời gian thành chuỗi dạng "giờ:phút:giây"
	function formatElapsedTime(milliseconds) {
		var seconds = Math.floor(milliseconds / 1000);
		var minutes = Math.floor(seconds / 60);

		return minutes % 60 + ':' + seconds % 60;
	}

	$scope.seatArray = [];

	$scope.getSeat_Scheduled = function (idBooking) {
		var url = `${host_seatScheduled}/v1/${idBooking}`;
		$http.get(url).then(resp => {
			$scope.seat_scheduled = resp.data;
			console.log("seat_scheduled", resp.data);
			$scope.seatArray = resp.data.map(function (booking) {
				return booking.id_SEAT;
			});
		})
	}

	$scope.payBooking = [];
	$scope.pay = function (idBooking) {
		var url = `${host_pay}/${idBooking}`;
		$http.get(url).then(resp => {
			$scope.payBooking.push(resp.data);
			console.log("payBooking", resp.data);
		})
	}

	$scope.availableVouchers = [];

	$scope.voucher = function () {
		var url = `${host_voucher}/all`;
		$http.get(url).then(resp => {
			$scope.availableVouchers = resp.data;
			console.log("availableVouchers", $scope.availableVouchers)
		})
	}

	$scope.form = {};

	$scope.updatePrice = function (idBooking) {
		var data = angular.copy($scope.form);
		var index = $scope.availableVouchers.findIndex(idVoucher => idVoucher.id === $scope.form.idVoucher);
		const discount = $scope.availableVouchers[index].discount;
		var url = `${host_booking}/v1/${idBooking}`;
		$http.get(url).then(resp => {
			console.log(resp.data.price);
			console.log(discount);
			$scope.discountedPrice = resp.data.price - (resp.data.price * discount / 100);
		})
	}



	$scope.updateCheckbox = function () {
		var isValid = checkValidate();

		if (isValid) {
			// Nếu validation thành công, gọi thanhtoan(idBooking)
			$scope.thanhtoan(idBooking);
		}
	};


	const btnCheckbox = document.getElementById('checkbox');
	// const btnThanhToan = document.getElementById('thanhtoan');
	$scope.showSuccessMessage = false;
	function checkValidate() {
		let isCheck = true;
		if (!btnCheckbox.checked) {
			btnCheckbox.focus();
			btnCheckbox.style.border = '2px solid red'; // Add a red border to the checkbox
			isCheck = false;
			$scope.showSuccessMessage = true; // Show message
		} else {
			btnCheckbox.style.border = ''; // Remove the red border if the checkbox is checked
			$scope.showSuccessMessage = false;
		}
		return isCheck;
	}


	$scope.thanhtoan = function (idBooking) {
		var dataVoucher = angular.copy($scope.form);
		var index = $scope.availableVouchers.findIndex(idVoucher => idVoucher.id === $scope.form.idVoucher);

		// Kiểm tra nếu index không tìm thấy hoặc discount là undefined
		if (index === -1 || $scope.availableVouchers[index].discount === undefined) {
			// Xử lý khi không chọn voucher hoặc khi discount là undefined
			console.log("No voucher selected or discount is undefined");
			// Thực hiện thanh toán với giá gốc
			var url = `${host_booking}/v1/${idBooking}`;
			$http.get(url).then(resp => {
				$scope.discountedPrice = resp.data.price;
				$scope.form.idVoucher = null;
				// Gọi hàm xử lý thanh toán
				$scope.performPayment1(idBooking);
				console.log("thanhtoan", resp.data);
			});
			return;
		}

		const discount = $scope.availableVouchers[index].discount;

		var url = `${host_booking}/v1/${idBooking}`;
		$http.get(url).then(resp => {
			$scope.discountedPrice = resp.data.price - (resp.data.price * discount / 100);
			// Gọi hàm xử lý thanh toán
			$scope.performPayment(idBooking);
			console.log("thanhtoan", resp.data);
		});
	}

	$scope.performPayment = function (idBooking) {
		var data = {
			price: $scope.discountedPrice,
			intent: "Buy",
			method: "Online",
			currency: "VND",
			description: "Thanh toan tien ve xem phim",
			id_BOOKING: {
				id: idBooking
			},
			id_VOUCHER: {
				id: $scope.form.idVoucher
			}
		};

		console.log("data", data);

		// create pay
		$http.post(`${host_pay}`, data).then(resp => {




			//update status booking
			$http.get(`${host_booking}/update/${idBooking}`).then(resp => {
				console.log("update", resp.data);

				//guigmail
				$http.get(`${host_pay}/${idBooking}`).then(resp => {
					console.log("pay", resp.data);
				})

				// id customer
				var url = `${host_booking}/v1/${idBooking}`;
				$http.get(url).then(resp => {
					console.log("sdss", resp.data.id_CUSTOMER.id);
					window.location.href = `http://localhost:8080/historyBooking/` + resp.data.id_CUSTOMER.id;
				});
			});
			$scope.stopClock();
		}).catch(error => {
			console.log("Error", error);
		});
	};
	$scope.performPayment1 = function (idBooking) {
		var data = {
			price: $scope.discountedPrice,
			intent: "Buy",
			method: "Online",
			currency: "VND",
			description: "Thanh toan tien ve xem phim",
			id_BOOKING: {
				id: idBooking
			}
		};


		console.log("data", data);

		// create pay
		$http.post(`${host_pay}`, data).then(resp => {



			//update status booking
			$http.get(`${host_booking}/update/${idBooking}`).then(resp => {
				console.log("update", resp.data);

				//guigmail
				$http.get(`${host_pay}/${idBooking}`).then(resp => {
					console.log("pay", resp.data);
				})

				// id customer
				var url = `${host_booking}/v1/${idBooking}`;
				$http.get(url).then(resp => {
					console.log("sdss", resp.data.id_CUSTOMER.id);
					window.location.href = `http://localhost:8080/historyBooking/` + resp.data.id_CUSTOMER.id;
				});

			});

			$scope.stopClock();
		}).catch(error => {
			console.log("Error", error);
		});
	};

	$scope.updateCheckboxPaypal = function(){
		var isValid = checkValidate();

		if (isValid) {
			// Nếu validation thành công, gọi thanhtoan(idBooking)
			$scope.thanhtoanPayPal(idBooking);
		}
	}

	$scope.thanhtoanPayPal = function (idBooking) {
		var dataVoucher = angular.copy($scope.form);
		var index = $scope.availableVouchers.findIndex(
			(idVoucher) => idVoucher.id === $scope.form.idVoucher
		);

		// Kiểm tra nếu index không tìm thấy hoặc discount là undefined
		if (
			index === -1 ||
			$scope.availableVouchers[index].discount === undefined
		) {
			// Xử lý khi không chọn voucher hoặc khi discount là undefined
			console.log("No voucher selected or discount is undefined");
			// Thực hiện thanh toán với giá gốc
			var url = `${host_booking}/v1/${idBooking}`;
			$http.get(url).then((resp) => {
				$scope.discountedPrice = resp.data.price;
				$scope.form.idVoucher = null;
				// Gọi hàm xử lý thanh toán
				$scope.performPaymentPaypal1(idBooking);
				console.log("thanhtoan", resp.data);
			});
			return;
		}

		const discount = $scope.availableVouchers[index].discount;

		var url = `${host_booking}/v1/${idBooking}`;
		$http.get(url).then((resp) => {
			$scope.discountedPrice =
				resp.data.price - (resp.data.price * discount) / 100;
			// Gọi hàm xử lý thanh toán
			$scope.performPaymentPaypal(idBooking);
			console.log("thanhtoan", resp.data);
		});
	};
	
	$scope.performPaymentPaypal = function (idBooking) {

		var url = `${host_pay}/all`;
	
		$http.get(url).then((resp) => {
			var allPays = resp.data;
	
			// Lọc các pay có id_BOOKING.id bằng với idBooking
			var paysWithMatchingId = allPays.filter(function(pay) {
				return pay.id_BOOKING.id === idBooking;
			});
	
			if (paysWithMatchingId.length > 0) {
				console.log(paysWithMatchingId);
			} else {
				console.log("Không tìm thấy dữ liệu cho id_BOOKING.id =", idBooking);
				var data = {
					price: $scope.discountedPrice,
					intent: "Buy",
					method: "Online",
					currency: "USD",
					description: "Thanh toan tien ve xem phim qua Paypal",
					id_BOOKING: {
						id: idBooking,
					},
					id_VOUCHER: {
						id: $scope.form.idVoucher,
					},
				};

				console.log("data", data);

				// create pay
				$http
					.post(`${host_pay}`, data)
					.then((resp) => {
						$scope.stopClock();
					})
					.catch((error) => {
						console.log("Error", error);
				});
			}
		});
	};

	$scope.performPaymentPaypal1 = function (idBooking) {
		var url = `${host_pay}/all`;
	
		$http.get(url).then((resp) => {
			var allPays = resp.data;
	
			// Lọc các pay có id_BOOKING.id bằng với idBooking
			var paysWithMatchingId = allPays.filter(function(pay) {
				return pay.id_BOOKING.id === idBooking;
			});
	
			if (paysWithMatchingId.length > 0) {
				console.log(paysWithMatchingId);
			} else {
				console.log("Không tìm thấy dữ liệu cho id_BOOKING.id =", idBooking);
				var data = {
					price: $scope.discountedPrice,
					intent: "Buy",
					method: "Online",
					currency: "USD",
					description: "Thanh toan tien ve xem phim qua Paypal",
					id_BOOKING: {
						id: idBooking,
					}
				};

				console.log("data", data);

				// create pay
				$http
					.post(`${host_pay}`, data)
					.then((resp) => {
						$scope.stopClock();
					})
					.catch((error) => {
						console.log("Error", error);
				});
			}
		});
	};

	$scope.loadIdUserLogin = function () {
		$http.get('http://localhost:8080/api/getUserId').then(function (response) {
			$scope.userId = response.data;
			userIdLogin = $scope.userId;
			console.log('idUserLogin', userIdLogin);
			window.location.href = `http://localhost:8080/historyBooking/` + userIdLogin
		});
	}

	$scope.movie_scheduleds = [];
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

	$scope.pay(idBooking);
	$scope.getBookingId(idBooking);
	$scope.getSeat_Scheduled(idBooking);
	$scope.loadAllMovie_Scheduleds();
	$scope.voucher();
});