let host = "http://localhost:8080/api/seat";
let host_seatScheduled = "http://localhost:8080/api/seat_scheduled";
let host_booking = "http://localhost:8080/api/booking";
let host_customer = "http://localhost:8080/api";
let host_movie_scheduled = "http://localhost:8080/api/movie_scheduled";
const app = angular.module("app", []);

app.controller("controller", function ($scope, $http, $rootScope, $filter) {
	$scope.form = {};
	$scope.seats = [];
	$scope.seatsScheduled = [];
	$scope.booking = [];

	$scope.reset = function () {
		$scope.form = {};
	}

	var url = window.location.href;
	var parts = url.split('/');
	var idMovieScheduled = parts[parts.length - 1];

	$scope.idMovieScheduled = idMovieScheduled;

	//lay thoi gian hien tai hh:mm:ss
	function getCurrentTime() {
		const now = new Date();
		const hours = now.getHours().toString().padStart(2, '0');
		const minutes = now.getMinutes().toString().padStart(2, '0');
		const seconds = now.getSeconds().toString().padStart(2, '0');

		return hours + ':' + minutes + ':' + seconds;
	}

	// Gọi hàm và lấy giờ hiện tại định dạng "hh:mm:ss"
	$scope.currentTime = getCurrentTime();

	console.log($scope.currentTime);

	function getCurrentDate() {
		const now = new Date();
		const year = now.getFullYear();
		const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Tháng tính từ 0
		const day = now.getDate().toString().padStart(2, '0');

		return year + '-' + month + '-' + day;
	}

	// Gọi hàm và lấy ngày hiện tại định dạng "yyyy-MM-DD"
	$scope.currentDate = getCurrentDate();

	console.log($scope.currentDate);

	//bat dau

	$scope.movie_ScheduledById = [];
	$scope.getMovieScheduledById = function () {
		//find movieScheduledById => filter idRoom, idMovieScheduled, day, timeStart 
		var url = `${host_movie_scheduled}/${idMovieScheduled}`;
		$http.get(url).then(resp => {
			$scope.movie_ScheduledById.push(resp.data);
			console.log("movie_ScheduledById", resp.data);

			$scope.idRoom = resp.data.id_ROOM.id;
			$scope.idMovieScheduled = resp.data.id;
			$scope.day = resp.data.date;
			$scope.timeStart = resp.data.time_START;

			var idRoom = $scope.idRoom;
			var idMovieScheduled = $scope.idMovieScheduled;
			var day = $scope.day = resp.data.date;
			var timeStart = $scope.timeStart;

			console.log("idRoom", $scope.idRoom);
			console.log("idMovieScheduled", $scope.idMovieScheduled);
			console.log("day", $scope.day);
			console.log("timeStart", $scope.timeStart);


			// tat ca cac ghe trong phong va cac ghe da dat theo phong
			$scope.loadSeatByIdRoomAndLoadSeat_ScheduledByIdRoom = function (idRoom) {
				//loadSeatByIdRoom
				var url = `${host}/${idRoom}`;//idRoom
				$http.get(url).then(resp => {
					$scope.seats = resp.data;
					var seats = resp.data;

					// Sắp xếp dữ liệu ghế theo "seat_row"
					seats.sort(function (a, b) {
						return a.seat_ROW.localeCompare(b.seat_ROW);
					});
					//in seat
					console.log("tat ca cac ghe trong phong", seats);

					//load cac da dat co trong phong
					var url1 = `${host_seatScheduled}/${idRoom}/${day}/${timeStart}/${idMovieScheduled}`;
					$http.get(url1).then(resp => {
						$scope.seatsScheduled = resp.data;
						var getAllSeat_scheduledByIdRoom = resp.data;
						//in getAllSeat_scheduledByIdRoom

						console.log("getAllSeat_scheduledByIdRoom", getAllSeat_scheduledByIdRoom);
						// Tạo mảng chứa hàng và cột tương ứng
						var seatRows = [];
						var currentRow = null;

						seats.forEach(function (seat) {
							if (currentRow !== seat.seat_ROW) {
								currentRow = seat.seat_ROW;
								seatRows.push({
									row: currentRow,
									seats: []
								});
							}
							seatRows[seatRows.length - 1].seats.push(seat);
						});

						$scope.seatRows = seatRows;

						// Mảng lưu trạng thái ghế đã chọn
						$scope.selectedSeats = [];

						// Tổng tiền
						$scope.totalAmount = 0;

						// Xử lý sự kiện khi checkbox thay đổi trạng thái
						$scope.onSeatChange = function (seat) {
							if (seat.isSelected) {
								$scope.selectedSeats.push(seat);
								if (seat.seat_TYPE === "ECO") {
									$scope.totalAmount += seat.seat_PRICE;
								} else if (seat.seat_TYPE === "VIP") {
									$scope.totalAmount += seat.seat_PRICE;
								} else {
									$scope.totalAmount += 15;
								}
							} else {
								var index = $scope.selectedSeats.indexOf(seat);
								if (index !== -1) {
									$scope.selectedSeats.splice(index, 1);
									if (seat.seat_TYPE === "ECO") {
										$scope.totalAmount -= seat.seat_PRICE;
									} else if (seat.seat_TYPE === "VIP") {
										$scope.totalAmount -= seat.seat_PRICE;
									} else {
										$scope.totalAmount += 15;
									}
								}
							}
							console.log('selectedSeats', $scope.selectedSeats);
							$rootScope.selectedSeats = $scope.selectedSeats;
							createFormObject();
							$scope.getIdSeat();
						};

						// Duyệt qua danh sách ghế và kiểm tra điều kiện
						angular.forEach($scope.seats, function (seat) {

							var matchingSeat = getAllSeat_scheduledByIdRoom.find(function (scheduledSeat) {

								var dayAndTimeSeatScheduled =
									new Date(scheduledSeat.id_BOOKING.id_MOVIE_SCHEDULED.date + ' ' + scheduledSeat.id_BOOKING.id_MOVIE_SCHEDULED.time_END);

								var dayAndTimeToday =
									new Date($scope.currentDate + ' ' + $scope.currentTime);
								return (
									scheduledSeat.id_SEAT.seat_NUMBER === seat.seat_NUMBER &&
									scheduledSeat.id_SEAT.seat_ROW === seat.seat_ROW &&
									scheduledSeat.id_SEAT.seat_TYPE === seat.seat_TYPE
									&& dayAndTimeSeatScheduled >= dayAndTimeToday
								);
							});
							if (matchingSeat) {
								// Ghế thỏa mãn điều kiện, đánh dấu và không vô hiệu hóa
								seat.isSelected = true;
								seat.isDisabled = true;
							} else {
								// Ghế không thỏa mãn điều kiện, không đánh dấu và vô hiệu hóa
								seat.isSelected = false;
								seat.isDisabled = false;
							}
						});

					});
				}).catch(error => {
					console.log("Error", error);
				})
			}
			$scope.loadSeatByIdRoomAndLoadSeat_ScheduledByIdRoom(idRoom);

			$scope.userId = [];
			var userIdLogin = '';;
			$scope.loadIdUserLogin = function () {
				$http.get('http://localhost:8080/api/getUserId').then(function (response) {
					$scope.userId = response.data;
					userIdLogin = $scope.userId;
					$scope.getAllBookingByCustomer(userIdLogin);
					console.log('idUserLogin', userIdLogin);
					createFormObject();
				});
			}
			$scope.loadIdUserLogin();

			$scope.loadIdUserLogin = function () {
				$http.get('http://localhost:8080/api/getUserId').then(function (response) {
					$scope.userId = response.data;
					userIdLogin = $scope.userId;
					console.log('idUserLogin', userIdLogin);
					window.location.href = `http://localhost:8080/historyBooking/` + userIdLogin
				});
			}

			function createFormObject() {
				$scope.form = {
					id_CUSTOMER: {
						id: userIdLogin
					},
					date: new Date(),
					id_MOVIE_SCHEDULED: {
						id: idMovieScheduled
					},
					price: $scope.totalAmount,
				}
			}

			$scope.ids = []; // Đặt biến ids ở cấp độ phạm vi của $scope
			$scope.idsExists = [];
			$scope.getIdSeat = function () {
				$scope.ids = []; // Xóa danh sách IDs hiện có và thay thế bằng danh sách mới
				$scope.anotherArray = [...$scope.selectedSeats];

				$scope.idsExists = [];// 
				$scope.idsExistsanotherArray = [...$scope.seatsScheduled];// ghe da ton tai trong database

				for (var i = 0; i < $scope.idsExistsanotherArray.length; i++) {
					$scope.idsExists.push($scope.idsExistsanotherArray[i].id_SEAT.id);
				}
				for (var i = 0; i < $scope.anotherArray.length; i++) {
					$scope.ids.push($scope.anotherArray[i].id);
				}
				console.log("ids", $scope.ids);
				console.log("idsExists", $scope.idsExists);

				console.log("muarray", $scope.anotherArray);
				console.log("idsExistsanotherArray", $scope.idsExistsanotherArray);
			};



			$scope.createBooking = function () {
				//
				$scope.loadSeat = function (idRoom, day, timeStart, idMovieScheduled) {
					var url1 = `${host_seatScheduled}/${idRoom}/${day}/${timeStart}/${idMovieScheduled}`;
					$http.get(url1).then(resp => {
						$scope.seat = resp.data;
						console.log("$scope.seat", $scope.seat);
						$rootScope.seatsScheduled1 = $scope.seat;

						//$rootScope chiase data
						var seatsScheduled = $rootScope.seatsScheduled1;
						console.log("seatsScheduleddcCHiase", seatsScheduled);

						var selectedSeats = $rootScope.selectedSeats;
						console.log("selectedSeats", selectedSeats);

						// Lấy danh sách các ID của selectedSeats
						var selectedSeatIds = selectedSeats.map(function (selectedSeat) {
							return selectedSeat.id;
						});
						console.log("Danh sach id select seat", selectedSeatIds);


						var idSeatScheduled = seatsScheduled.map(function (seatScheduled) {
							return seatScheduled.id_SEAT.id;


						})
						console.log("Danh sach id seatScheduled", idSeatScheduled);

						// Tìm phần tử chung giữa hai mảng
						var phanTuChung = selectedSeatIds.filter(function (id) {
							return idSeatScheduled.includes(id);
						});

						console.log(phanTuChung);
						if (phanTuChung.length > 0) {
							alert("Ai đó đã nhanh tay hơn bạn", phanTuChung);
							location.reload();
						} else {
							var booking = angular.copy($scope.form);
							var url = `${host_booking}`;
							$http.post(url, booking).then(resp => {
								$scope.booking_create.push(booking);
								$scope.loadAllBooking();
								// Lấy ID ghế vừa được thêm vào cơ sở dữ liệu
								var newSeatId = resp.data.id;
								globalNewSeatId = newSeatId;
								console.log("Bookingnew", resp);
								console.log('New seat ID:', newSeatId);

								// Gọi hàm insertSeats sau khi đã có globalNewSeatId
								$scope.insertSeats(newSeatId);
							}).catch(error => {
								console.log(error);
							});
						}
					})
				}

				$scope.loadSeat(idRoom, day, timeStart, idMovieScheduled);
			};


			var globalNewSeatId;

			$scope.idBooking = globalNewSeatId;
			console.log("idBooking", $scope.idBooking)
			//newSeatId
			$scope.insertSeats = function (newSeatId) {
				var url1 = `${host_seatScheduled}/${idRoom}/${day}/${timeStart}/${idMovieScheduled}`;
				$http.get(url1).then(resp => {
					$scope.seatsScheduled = resp.data;

					console.log("idsSeat", $scope.seatsScheduled);

					for (var i = 0; i < $scope.ids.length; i++) {
						var seat = $scope.ids[i];
						var data = {
							id_SEAT: {
								id: seat
							},
							id_BOOKING: {
								id: globalNewSeatId
							}
						};
						//luu vo ghe
						$http.post('http://localhost:8080/api/seat_scheduled', data).then(function (response) {
							$scope.getAllSeatScheduled();
							console.log('Seat inserted successfully:', response.data);
							window.location.href = `http://localhost:8080/checkout/` + newSeatId
						}, function (error) {
							console.error('Error inserting seat:', error);
						});
					}
				})
			};

		});
	}


	$scope.customers = [];
	$scope.movie_Scheudled = [];
	$scope.movie_scheduleds = [];
	$scope.booking_create = [];

	$scope.loadAllCustomers = function () {
		var url = `${host_customer}/user`;
		$http.get(url).then(resp => {
			$scope.customers = resp.data;
			console.log("AllCustomers", resp);
		}).catch(error => {
			console.log("Error", error);
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

	$scope.loadAllBooking = function () {
		var url = `${host_booking}/all`;
		$http.get(url).then(resp => {
			$scope.booking_create = resp.data;
			console.log("bookingsAll", resp);
		}).catch(error => {
			console.log("Error", error);
		})
	}

	$scope.seatScheduled = [];

	$scope.getAllSeatScheduled = function () {
		var url = `${host_seatScheduled}/all`;
		$http.get(url).then(resp => {
			$scope.seatScheduled = resp.data;
		})
	}

	$scope.BookingByIdCustomer = [];
	$scope.getAllBookingByCustomer = function (userIdLogin) {
		var url = `${host_booking}/profile/${userIdLogin}`;
		$http.get(url).then(resp => {
			$scope.BookingByIdCustomer = resp.data;
			console.log("getAllBookingByCustomer", resp.data);
		})
	}


	$scope.edit = function (id) {
		var url = `${host_booking}/v1/${id}`;
		$http.get(url).then(resp => {
			$scope.form = resp.data;
			console.log("BookingView", resp);
		}).catch(error => {
			console.log("Error", error);
		})
	}

	// phan trang
	$scope.pager = {
		page: 0,
		size: 10,
		get items() {
			var start = this.page * this.size;
			return $scope.booking_create.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.booking_create.length / this.size)
		},
		first() {
			this.page = 0;
		},
		prev() {
			this.page--;
		},
		next() {
			this.page++;
		},
		last() {
			this.page = this.count - 1;
		}
	}

	// =========================TÌM KIẾM PHIM CHO NGƯỜI DÙNG================================
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

	// =========================END TÌM KIẾM PHIM CHO NGƯỜI DÙNG================================


	//==========================START EXPORT FILE===================
	//Export file data table to excel - start
	$scope.exportToExcel = function () {
		// Lấy dữ liệu từ bảng
		var data = [];
		var headers = [];

		// Sử dụng document.querySelectorAll thay vì angular.element
		var thElements = document.querySelectorAll('#billtable thead th');
		thElements.forEach(function (th) {
			headers.push(th.innerText);
		});

		var trElements = document.querySelectorAll('#billtable tbody tr');
		trElements.forEach(function (tr) {
			var row = [];
			var tdElements = tr.querySelectorAll('td');
			tdElements.forEach(function (td) {
				row.push(td.innerText);
			});
			data.push(row);
		});

		// Tạo workbook và thêm dữ liệu
		var workbook = XLSX.utils.book_new();
		var sheet = XLSX.utils.aoa_to_sheet([headers].concat(data));
		XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');

		// Xuất file Excel
		XLSX.writeFile(workbook, 'Bill_Data.xlsx');
	};
	//Export file data table to excel - end

	//Export file data table to pdf - start
	$scope.exportToPDF = function () {
		// Lấy tên cột từ bảng trên giao diện
		$scope.columns = $scope.getTableColumns();

		// Tạo đối tượng jsPDF
		var doc = new window.jspdf.jsPDF();

		// Lấy dữ liệu từ bảng
		var data = [];
		var trElements = document.querySelectorAll('#billtable tbody tr');

		trElements.forEach(function (tr) {
			var row = [];
			var tdElements = tr.querySelectorAll('td');

			tdElements.forEach(function (td) {
				row.push(td.innerText);
			});

			data.push(row);
		});

		// Tạo bảng trong file PDF với định dạng tùy chỉnh và sử dụng $scope.columns
		doc.autoTable({
			head: [$scope.columns.map(column => column.title)],
			body: data,
			columns: $scope.columns,
			styles: {
				cellPadding: 2,
				fontSize: 10,
				valign: 'middle',
				halign: 'center'
			},
			margin: { top: 20 },
			addPageContent: function (data) {
				// Thêm tiêu đề nếu cần
				doc.text('Bill Data', 14, 15);
			}
		});

		// Tải file PDF
		if (doc) {
			doc.save('Bill_Data.pdf');
		} else {
			console.error("Không thể tạo đối tượng jsPDF");
		}
	};

	// Hàm để lấy tên cột từ bảng trên giao diện
	$scope.getTableColumns = function () {
		var columns = [];

		// Kiểm tra xem phần tử #billtable có tồn tại hay không
		var tableElement = document.getElementById('billtable');

		if (tableElement) {
			// Lấy tên cột từ bảng trên giao diện
			var headerCells = tableElement.querySelectorAll('thead th');
			headerCells.forEach(function (th) {
				columns.push({ title: th.textContent, dataKey: th.textContent });
			});
		} else {
			console.error("Không tìm thấy phần tử #billtable");
		}

		return columns;
	};
	//Export file data table to pdf - end
	//==========================END EXPORT FILE=====================

	
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
	$scope.loadAllCustomers();
	$scope.loadAllBooking();
	$scope.loadAllMovie_Scheduleds();
	$scope.getMovieScheduledById();
});