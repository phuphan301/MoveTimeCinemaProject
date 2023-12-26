let host = "http://localhost:8080/api/movie_scheduled";
let host_movie = "http://localhost:8080/api/movie";
let host_room = "http://localhost:8080/api/room";
let host_cinemas = "http://localhost:8080/api/cinema";
let host_customer = "http://localhost:8080/api";
const app = angular.module("app", []);
app.controller("controller", function ($scope, $http) {
    $scope.form = {};

    $scope.movie_scheduleds = [];
    $scope.movies = [];
    $scope.rooms = [];
    $scope.cinemas = [];



    $scope.movie_scheduledsbyId = [];

    $scope.reset = function () {
        $scope.form = {};
    }

    $scope.loadAllMovie_Scheduleds = function () {
        var url = `${host}/all`;
        $http.get(url).then(resp => {
            // $scope.movie_scheduleds = resp.data;
            $scope.movie_scheduleds = resp.data.filter(item => item.status !== false);
            console.log("Allmovie_scheduleds", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    /*$scope.inputValue = document.getElementById("movieId").value;
    //loadListMovieScheduledByID
    $scope.loadMovie_ScheduledsById = function(id){

        var url = `${host}/detail/${id}`;
        $http.get(url).then(resp=>{
            $scope.movie_scheduledsbyId = resp.data;
            var target_cinema_name = "QUANGTRUNG CINEMAS";
            $scope.filteredMovies = resp.data.filter(function(movie) {
                return movie.id_ROOM.id_CINEMAS.name === target_cinema_name;
                });
            console.log("loadMovie_ScheduledsById", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }*/



    $scope.loadAllMovies = function () {
        var url = `${host_movie}/all`;
        $http.get(url).then(resp => {
            $scope.movies = resp.data;
            console.log("AllMovies", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.loadAllCinemas = function () {
        var url = `${host_cinemas}/all`;
        $http.get(url).then(resp => {
            $scope.cinemas = resp.data;
            console.log("AllCinemas", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.editCinemas = function (id) {
        var url = `${host_cinemas}/${id}`;
        $http.get(url).then(resp => {
            $scope.form = resp.data;
            console.log("CinemaEdit", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.editCinemasAndRoom = function (IdRoom, IdCinemas) {
        var url = `${host_room}/${IdRoom}/${IdCinemas}`;
        $http.get(url).then(resp => {
            $scope.form = resp.data;
            console.log("editCinemasAndRoom", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.loadAllRooms = function () {
        var url = `${host_room}/all`;
        $http.get(url).then(resp => {
            $scope.rooms = resp.data;
            console.log("AllRoom", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }


    // ================================================================
    // ========================VALIDATION==============================
    $scope.checkAndcreateMovie_scheduled = function () {
        // Xử lý kiểm tra và validation ở đây
        var isValid = checkValidate();

        if (isValid) {
            // Nếu validation thành công, gọi createMovie_scheduled()
            $scope.createmovie_scheduled();
        }
    };
    $scope.checkAndupdateMovie_scheduled = function () {
        // Xử lý kiểm tra và validation ở đây
        var isValid = checkValidate();

        if (isValid) {
            // Nếu validation thành công, gọi createMovie_scheduled()
            $scope.createmovie_scheduled();
        }
    };
    const nameMovieEle = document.getElementById('nameMovie');
    const roomCinemaEle = document.getElementById('roomCinema');
    const dateEle = document.getElementById('date');
    const timestartEle = document.getElementById('timestart');
    const timeendEle = document.getElementById('timeend');

    const btnMvSheduled1 = document.getElementById('btn1');
    const btnMvSheduled2 = document.getElementById('btn2');
    const inputEles = document.querySelectorAll('.form-group');
	// Nếu nhảy lỗi console đến đây thì copy 3 nút thêm,sửa, resset qua file html chứa file js này rồi chỉnh hidden
    btnMvSheduled1.addEventListener('click', function () {
        Array.from(inputEles).map((ele) =>
            ele.classList.remove('success', 'error')
        );
    });
    btnMvSheduled2.addEventListener('click', function () {
        Array.from(inputEles).map((ele) =>
            ele.classList.remove('success', 'error')
        );
    });

    function checkValidate() {
        let nameMovieValue = nameMovieEle.value;
        let roomCinemaValue = roomCinemaEle.value;
        let dateValue = dateEle.value;
        let timestartValue = timestartEle.value;
        let timeendValue = timeendEle.value;

        let isCheck = true;

        if (nameMovieValue === '') {
            setError(nameMovieEle, 'You have not selected data information');
            isCheck = false;
        } else {
            setSuccess(nameMovieEle);
        }
        if (roomCinemaValue === '') {
            setError(roomCinemaEle, 'You have not selected data information');
            isCheck = false;
        } else {
            setSuccess(roomCinemaEle);
        }


        if (dateValue == '') {
            setError(dateEle, 'This data must not be blank');
            isCheck = false;
        } else if (!isDate(dateValue)) {
            setError(dateEle, 'Date is not in the correct format');
            isCheck = false;
        } else {
            setSuccess(dateEle);
        }
        if (timestartValue == '') {
            setError(timestartEle, 'This data must not be blank');
            isCheck = false;
        } else if (!isTimes(timestartValue)) {
            setError(timestartEle, 'Start time is not in the correct format');
            isCheck = false;
        } else {
            setSuccess(timestartEle);
        }
        if (timeendValue == '') {
            setError(timeendEle, 'This data must not be blank');
            isCheck = false;
        } else if (!isTimes(timeendValue)) {
            setError(timeendEle, 'End time is not in the correct format');
            isCheck = false;
        } else {
            setSuccess(timeendEle);
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
    function isDate(date) {
        return /^\d{4}-\d{2}-\d{2}$/.test(date);
    }
    function isTimes(time) {
        return /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(time);
    }

    function resetForm(ele) {
        // Xóa lớp error và success
        Array.from(inputEles).forEach(ele => ele.classList.remove('error', 'success'));
    
        // Thêm lớp normal
        Array.from(inputEles).forEach(ele => ele.classList.add('normal'));
    }
    
    // Gọi hàm resetForm khi nút reset được nhấn
    document.getElementById('btn3').addEventListener('click', resetForm);

    // =====================END VALIDATION==============================
    // =================================================================




    $scope.createmovie_scheduled = function () {
        var movie_scheduled = angular.copy($scope.form);
        var url = `${host}`;
        $http.post(url, movie_scheduled).then(resp => {
            $scope.movie_scheduleds.push(movie_scheduled);
            $scope.reset();
            $scope.loadAllMovie_Scheduleds();
            console.log("MovieNew", resp);
        }).catch(error => {
            console.log(error);
        })
    }

    $scope.updatemovie_scheduled = function () {
        var movie_scheduled = angular.copy($scope.form);
        var url = `${host}/${$scope.form.id}`;
        $http.put(url, movie_scheduled).then(resp => {
            var index = $scope.movie_scheduleds.findIndex(movie_scheduled => movie_scheduled.id == $scope.form.id);
            $scope.movie_scheduleds[index] = resp.data;
            console.log("Updatemovie_scheduled", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.edit = function (id) {
        var url = `${host}/${id}`;
        $http.get(url).then(resp => {
            $scope.form = resp.data;
            resp.data.date = new Date(resp.data.date);
            console.log("movie_scheduledEdit", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.delete = function (id) {
        var url = `${host}/${id}`;
        $http.delete(url).then(reps => {
            var index = $scope.movie_scheduleds.findIndex(movie_scheduled => movie_scheduled.id == id);
            $scope.movie_scheduleds.splice(index, 1);
            console.log("movie_scheduledsDelete", reps);
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
            return $scope.movie_scheduleds.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.movie_scheduleds.length / this.size)
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

    //==========================START EXPORT FILE===================
    //Export file data table to excel - start
	$scope.exportToExcel = function () {
		// Lấy dữ liệu từ bảng
		var data = [];
		var headers = [];

		// Sử dụng document.querySelectorAll thay vì angular.element
		var thElements = document.querySelectorAll('#moviescheduledtable thead th');
		thElements.forEach(function (th) {
			headers.push(th.innerText);
		});

		var trElements = document.querySelectorAll('#moviescheduledtable tbody tr');
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
		XLSX.writeFile(workbook, 'MovieScheduled_Data.xlsx');
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
		var trElements = document.querySelectorAll('#moviescheduledtable tbody tr');
	
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
				doc.text('Movie Scheduled Data', 14, 15);
			}
		});
	
		// Tải file PDF
		if (doc) {
			doc.save('MovieScheduled_Data.pdf');
		} else {
			console.error("Không thể tạo đối tượng jsPDF");
		}
	};

	// Hàm để lấy tên cột từ bảng trên giao diện
	$scope.getTableColumns = function () {
		var columns = [];

		// Kiểm tra xem phần tử #moviescheduledtable có tồn tại hay không
		var tableElement = document.getElementById('moviescheduledtable');

		if (tableElement) {
			// Lấy tên cột từ bảng trên giao diện
			var headerCells = tableElement.querySelectorAll('thead th');
			headerCells.forEach(function (th) {
				columns.push({ title: th.textContent, dataKey: th.textContent });
			});
		} else {
			console.error("Không tìm thấy phần tử #moviescheduledtable");
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
    $scope.loadAllMovie_Scheduleds();
    $scope.loadAllMovies();
    $scope.loadAllCinemas();
    $scope.loadAllRooms();
});