let host = "http://localhost:8080/api/movie";
let movie_scheduled = "http://localhost:8080/api/movie_scheduled";
let booking = "http://localhost:8080/api/booking";
let host_customer = "http://localhost:8080/api";
const app = angular.module("app", []);
app.controller("controller", function ($scope, $http, $filter) {
	$scope.form = {};
	$scope.movies = [];
	$scope.movie_scheduleds = [];
	$scope.columns = [];

	$scope.form = {
        exist: true 
    };

	$scope.reset = function () {
		$scope.form = {};
	}

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

	$scope.loadAllMovie_Scheduleds = function () {
		var url = `${movie_scheduled}/all`;
		$http.get(url).then(resp => {
			$scope.movie_scheduleds = resp.data;
			console.log("Allmovie_scheduleds", resp);
		}).catch(error => {
			console.log("Error", error);
		})
	}

	$scope.loadAllMovie_ScheduledsNextDay = function () {
		var url = `${movie_scheduled}/all`;
		$http.get(url).then(resp => {
			$scope.movie_scheduleds = resp.data;
			console.log("Allmovie_scheduleds", resp);
			// Assume your data is stored in $scope.movies
			var currentDate = new Date();

			// Sử dụng $filter để lọc mảng theo điều kiện
			$scope.filteredMovies = $filter('filter')($scope.movie_scheduleds, function (movie) {
				var movieDate = new Date(movie.date + ' ' + movie.time_START); // Tạo đối tượng ngày từ chuỗi ngày và giờ

				// So sánh ngày giờ hiện tại với ngày giờ trong mục
				return movieDate > currentDate;
			});
			// xoa id_Movie trung
			var uniqueMovies = {};
			$scope.filteredMovies = $scope.filteredMovies.filter(function (movie) {
				if (!uniqueMovies[movie.id_MOVIE.id]) {
					uniqueMovies[movie.id_MOVIE.id] = true;
					return true;
				}
				return false;
			});
			console.log("filteredMovies", $scope.filteredMovies);

			// Sử dụng $filter để lọc mảng theo điều kiện
			$scope.filteredMoviesToDay = $filter('filter')($scope.movie_scheduleds, function (movie) {
				var movieDate = new Date(movie.date); // Tạo đối tượng ngày từ chuỗi ngày và giờ
				var dateToday = new Date($scope.currentDate);

				// So sánh ngày giờ hiện tại với ngày giờ trong mục
				return (
					movieDate.toDateString() === dateToday.toDateString()
				)
			});
			// xoa id_Movie trung
			var uniqueMovies = {};
			$scope.filteredMoviesToDay = $scope.filteredMoviesToDay.filter(function (movie) {
				if (!uniqueMovies[movie.id_MOVIE.id]) {
					uniqueMovies[movie.id_MOVIE.id] = true;
					return true;
				}
				return false;
			});
			console.log("filteredMoviesToDay", $scope.filteredMoviesToDay);
		}).catch(error => {
			console.log("Error", error);
		})
	}

	$scope.updateStatusMovie_Scheduled = function () {
		var url = `${movie_scheduled}/updateStatusMovie_Scheduled`;
		$http.get(url).then(resp => {

		})
	}


	$scope.loadAllMovies = function () {
		var url = `${host}/all`;
		$http.get(url).then(resp => {
			$scope.movies = resp.data;
			resp.data.publish_DATE = new Date(resp.data.publish_DATE);
			console.log("AllMovies", resp);
			console.log("resp.data.publish_DATE", resp.data.publish_DATE);
		}).catch(error => {
			console.log("Error", error);
		})
	}



	// ============================VALIDATION==============================
	$scope.checkAndCreateMovie = function () {
		// Xử lý kiểm tra và validation ở đây
		var isValid = checkValidateCreate();

		if (isValid) {
			// Nếu validation thành công, gọi createMovie()
			$scope.createMovie();
		}
	};
	$scope.checkAndUpdateMovie = function () {
		// Xử lý kiểm tra và validation ở đây
		var isValid = checkValidateUpdate();

		if (isValid) {
			// Nếu validation thành công, gọi createMovie()
			$scope.updateMovie();
		}
	};
	const nameEle = document.getElementById('name');
	const descriptionEle = document.getElementById('description');
	const actorsEle = document.getElementById('actors');
	const diretorsEle = document.getElementById('diretors');
	const gerneEle = document.getElementById('gerne');
	const trailerEle = document.getElementById('trailer');
	const durationEle = document.getElementById('duration');
	const ageEle = document.getElementById('age');
	const dateEle = document.getElementById('date');
	const imageEle = document.getElementById('formFile');

	const btnMovie1 = document.getElementById('btnmovie');
	const btnMovie2 = document.getElementById('btnmovie2');
	// const btnReset = document.getElementById('btnReset');

	const inputEles = document.querySelectorAll('.form-group');

	// Nếu nhảy lỗi console đến đây thì copy 3 nút thêm,sửa, resset qua file html chứa file js này rồi chỉnh hidden
	btnMovie1.addEventListener('click', function () {
		Array.from(inputEles).map((ele) =>
			ele.classList.remove('success', 'error')
		);
	});
	btnMovie2.addEventListener('click', function () {
		Array.from(inputEles).map((ele) =>
			ele.classList.remove('success', 'error')
		);
	});

	function checkValidateCreate() {
		let nameValue = nameEle.value;
		let descriptionValue = descriptionEle.value;
		let actorsValue = actorsEle.value;
		let diretorsValue = diretorsEle.value;
		let gerneValue = gerneEle.value;
		let trailerValue = trailerEle.value;
		let durationValue = durationEle.value;
		let ageValue = ageEle.value;
		let dateValue = dateEle.value;
		let imageValue = imageEle.value;

		let isCheck = true;

		if (nameValue == '') {
			setError(nameEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(nameEle);
		}

		if (descriptionValue == '') {
			setError(descriptionEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(descriptionEle);
		}

		if (actorsValue == '') {
			setError(actorsEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(actorsEle);
		}

		if (diretorsValue == '') {
			setError(diretorsEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(diretorsEle);
		}

		if (gerneValue == '') {
			setError(gerneEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(gerneEle);
		}

		if (trailerValue == '') {
			setError(trailerEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(trailerEle);
		}

		if (durationValue == '') {
			setError(durationEle, 'This data must not be blank');
			isCheck = false;
		} else if (!isDuration(durationValue)) {
			setError(durationEle, 'Duration is not in the correct format');
			isCheck = false;
		} else {
			setSuccess(durationEle);
		}

		if (ageValue == '') {
			setError(ageEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(ageEle);
		}

		if (dateValue == '') {
			setError(dateEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(dateEle);
		}

		if (imageValue == '') {
			setError(imageEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(imageEle);
		}

		return isCheck;
	}


	function checkValidateUpdate() {
		let nameValue = nameEle.value;
		let descriptionValue = descriptionEle.value;
		let actorsValue = actorsEle.value;
		let diretorsValue = diretorsEle.value;
		let gerneValue = gerneEle.value;
		let trailerValue = trailerEle.value;
		let durationValue = durationEle.value;
		let ageValue = ageEle.value;
		let dateValue = dateEle.value;

		let isCheck = true;

		if (nameValue == '') {
			setError(nameEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(nameEle);
		}

		if (descriptionValue == '') {
			setError(descriptionEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(descriptionEle);
		}

		if (actorsValue == '') {
			setError(actorsEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(actorsEle);
		}

		if (diretorsValue == '') {
			setError(diretorsEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(diretorsEle);
		}

		if (gerneValue == '') {
			setError(gerneEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(gerneEle);
		}

		if (trailerValue == '') {
			setError(trailerEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(trailerEle);
		}

		if (durationValue == '') {
			setError(durationEle, 'This data must not be blank');
			isCheck = false;
		} else if (!isDuration(durationValue)) {
			setError(durationEle, 'Duration is not in the correct format');
			isCheck = false;
		} else {
			setSuccess(durationEle);
		}

		if (ageValue === '') {
			setError(ageEle, 'You have not selected Cinema information');
			isCheck = false;
		} else {
			setSuccess(ageEle);
		}

		if (dateValue == '') {
			setError(dateEle, 'This data must not be blank');
			isCheck = false;
		} else {
			setSuccess(dateEle);
		}

		return isCheck;
	}

	function setSuccess(ele) {
		ele.parentNode.classList.add('success');
	}

	function setError(ele, message) {
		let parentEle = ele.parentNode;
		parentEle.classList.add('error');
		parentEle.querySelector('small').innerText = message;
	}


	function isDuration(number) {
		return /^([1-2]\d|[1-9]\d*)$/.test(number);
	}

	function resetForm(ele) {
		// Xóa lớp error và success
		Array.from(inputEles).forEach(ele => ele.classList.remove('error', 'success'));

		// Thêm lớp normal
		Array.from(inputEles).forEach(ele => ele.classList.add('normal'));
	}

	// Gọi hàm resetForm khi nút reset được nhấn
	document.getElementById('btn3').addEventListener('click', resetForm);

	// ==========================END VALIDATION==============================





	$scope.createMovie = function () {
		var movie = angular.copy($scope.form);
		var url = `${host}`;
		$http.post(url, movie).then(resp => {
			resp.data.publish_DATE = new Date(resp.data.publish_DATE)
			$scope.movies.push(movie);
			$scope.reset();
			$scope.loadAllMovies();
			console.log("MovieNew", resp);
		}).catch(error => {
			console.log(error);
		})
	}

	$scope.updateMovie = function () {
		var movie = angular.copy($scope.form);
		var url = `${host}/${$scope.form.id}`;
		$http.put(url, movie).then(resp => {
			var index = $scope.movies.findIndex(movie => movie.id == $scope.form.id);
			$scope.movies[index] = resp.data;
			console.log("UpdateMovie", resp);
		}).catch(error => {
			console.log("Error", error);
		})
	}

	$scope.edit = function (id) {
		var url = `${host}/${id}`;
		$http.get(url).then(resp => {
			$scope.form = resp.data;
			resp.data.publish_DATE = new Date(resp.data.publish_DATE);
			window.scrollTo(0, 0);
			console.log("MovieEdit", resp);
		}).catch(error => {
			console.log("Error", error);
		})
	}

	//upload hinh anh
	// $scope.imageChanged = function (files) {
	// 	var data = new FormData();
	// 	data.append('file', files[0]);
	// 	$http.post('http://localhost:8080/rest/upload/images', data, {
	// 		transformRequest: angular.indentity,
	// 		headers: { 'Content-Type': undefined }
	// 	}).then(resp => {
	// 		$scope.form.image = resp.data.name;
	// 	}).catch(error => {
	// 		alert("loi updoad hinh")
	// 		console.log(error)
	// 	})
	// }

	// upload image cloudinary
	$scope.uploadImage = function (files) {
		var data = new FormData();
		data.append('image', files[0]);

		$http.post('http://localhost:8080/cloudinary/upload', data, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		}).then(function (response) {
			$scope.form.image = response.data.public_id;
			console.log('Image uploaded successfully:', $scope.form.image);
		}).catch(function (error) {
			console.error('Error uploading image:', error);
		});
	};
	//reset
	$scope.reset = function () {
		$scope.form = {
			publish_DATE: new Date(),
			image: 'cloud-upload.jpg',
			available: true
		}
	}

	$scope.delete = function (id) {
		var url = `${host}/${id}`;
		$http.delete(url).then(reps => {
			var index = $scope.movies.findIndex(movie => movie.id == id);
			$scope.movies.splice(index, 1);
			console.log("MovieDelete", reps);
		}).catch(error => {
			console.log("Error", error);
		})
	}


	//phan trang
	$scope.pager = {
		page: 0,
		size: 10,
		get items() {
			var start = this.page * this.size;
			return $scope.movies.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.movies.length / this.size)
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

	$scope.loadIdUserLogin = function () {
		$http.get('http://localhost:8080/api/getUserId').then(function (response) {
			$scope.userId = response.data;
			userIdLogin = $scope.userId;
			console.log('idUserLogin', userIdLogin);
			window.location.href = `http://localhost:8080/historyBooking/` + userIdLogin
		});
	}

	$scope.updateStatus = function () {
		var url = `${booking}/updateStatus`
		$http.get(url).then(resp => {
			console.log(resp.data);
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


	// =========================NOW SHOWING +  SHOWTIME==============================

	// Lọc số lượng hiện thị phim
	$scope.moviesLimit = 5;

	// =========================END  NOW SHOWING +  SHOWTIME==============================

	//Export file data table to excel - start
	$scope.exportToExcel = function () {
		// Lấy dữ liệu từ bảng
		var data = [];
		var headers = [];

		// Sử dụng document.querySelectorAll thay vì angular.element
		var thElements = document.querySelectorAll('#movietable thead th');
		thElements.forEach(function (th) {
			headers.push(th.innerText);
		});

		var trElements = document.querySelectorAll('#movietable tbody tr');
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
		XLSX.writeFile(workbook, 'Movie_data.xlsx');
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
		var trElements = document.querySelectorAll('#movietable tbody tr');

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
				doc.text('Movie Data', 14, 15);
			}
		});

		// Tải file PDF
		if (doc) {
			doc.save('Movie_data.pdf');
		} else {
			console.error("Không thể tạo đối tượng jsPDF");
		}
	};

	// Hàm để lấy tên cột từ bảng trên giao diện
	$scope.getTableColumns = function () {
		var columns = [];

		// Kiểm tra xem phần tử #movietable có tồn tại hay không
		var tableElement = document.getElementById('movietable');

		if (tableElement) {
			// Lấy tên cột từ bảng trên giao diện
			var headerCells = tableElement.querySelectorAll('thead th');
			headerCells.forEach(function (th) {
				columns.push({ title: th.textContent, dataKey: th.textContent });
			});
		} else {
			console.error("Không tìm thấy phần tử #movietable");
		}

		return columns;
	};
	//Export file data table to pdf - end


	// ===============AVATAR PAGE ADMIN=======================
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
	// ===============AVATAR PAGE ADMIN=======================


	// ==============TOP PHIM==================


	// $scope.loadAllBooking = function () {
	// 	var url = `${booking}/all`;
	// 	$http.get(url).then(resp => {
	// 		$scope.bookings = resp.data;
	// 		console.log("bookingsAll", resp);
	// 	}).catch(error => {
	// 		console.log("Error", error);
	// 	})
	// }



	// ==============END TOP PHIM================


	// $scope.loadAllBooking();
	$scope.loadInfoCustomer();
	$scope.updateStatus();
	$scope.loadAllMovies();
	$scope.loadAllMovie_Scheduleds();
	$scope.loadAllMovie_ScheduledsNextDay();
	$scope.updateStatusMovie_Scheduled();
})