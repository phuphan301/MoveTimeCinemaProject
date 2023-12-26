let host = "http://localhost:8080/api/seat";
let host_room = "http://localhost:8080/api/room";
let host_customer = "http://localhost:8080/api";

const app = angular.module("app", []);
app.controller("controller", function ($scope, $http) {
    $scope.seat = [];
    $scope.rooms = [];
    $scope.form = {};

    $scope.reset = function () {
        $scope.form = {};
    }

    $scope.loadAllSeat = function () {
        var url = `${host}/all`;
        $http
            .get(url)
            .then((resp) => {
                $scope.seat = resp.data;
                console.log("AllSeat", resp);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };

    $scope.loadAllRooms = function () {
        var url = `${host_room}/all`;
        $http.get(url).then(resp => {
            $scope.rooms = resp.data;
            console.log("AllRoom", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.seats = [];
    $scope.errorMessage = "";

    $scope.demoViewSeat = function () {
        $scope.seats = [];
        $scope.errorMessage = "";

        if ($scope.totalSeats == $scope.numRows * $scope.numColumns) {
            $scope.errorMessage = null;
        } else {
            $scope.errorMessage = "Not enough seats!";
            return;
        }

        var totalSeatsCreated = 0;
        for (var i = 1; i <= $scope.numRows; i++) {
            var row = [];
            for (var j = 1; j <= $scope.numColumns; j++) {
                if (totalSeatsCreated < $scope.totalSeats) {
                    var seatLabel = String.fromCharCode(64 + i);
                    row.push({
                        row: seatLabel,
                        column: j,
                    });
                    totalSeatsCreated++;
                }
            }
            $scope.seats.push(row);
        }
    };

    $scope.createSeats = function () {
        var movie_scheduled = angular.copy($scope.form);
        var seats = [];
        for (var i = 1; i <= $scope.numRows; i++) {
            for (var j = 1; j <= $scope.numColumns; j++) {
                seats.push({
                    seat_ROW: String.fromCharCode(64 + i),
                    seat_NUMBER: j,
                    id_ROOM: {
                        id: movie_scheduled.id,
                    }
                });
            }
        }

        console.log(seats);

        $http.post('http://localhost:8080/api/seat/create', seats, { headers: { 'Content-Type': 'application/json' } })
            .then(function (response) {
                console.log(response.data);
            }
            );
    };

    //phan trang
    $scope.pager = {
        page: 0,
        size: 10,
        get items() {
            var start = this.page * this.size;
            return $scope.seat.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.seat.length / this.size)
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


    // =====================VALIDATION==============================
    $scope.checkAndcreateSeat = function () {
        // Xử lý kiểm tra và validation ở đây
        var isValid = checkValidate();

        if (isValid) {
            // Nếu validation thành công, gọi createRoom()
            $scope.createSeats();
        }
    };

    const fullnameEle = document.getElementById('fullname');
    const emailEle = document.getElementById('email');
    const numberphoneEle = document.getElementById('numberphone');

    const floatingSelectEle = document.getElementById('roomCinema');


    const btnSeat = document.getElementById('btn');
    // const btnRoom2 = document.getElementById('btn2');
    const inputEles = document.querySelectorAll('.form-group');

    // Nếu nhảy lỗi console đến đây thì copy 3 nút thêm,sửa, resset qua file html chứa file js này rồi chỉnh hidden
    btnSeat.addEventListener('click', function () {
        Array.from(inputEles).map((ele) =>
            ele.classList.remove('success', 'error')
        );
    });


    function checkValidate() {
        let fullnameValue = fullnameEle.value;
        let emailValue = emailEle.value;
        let numberphoneValue = numberphoneEle.value;
        let floatingSelectValue = floatingSelectEle.value;

        let isCheck = true;

        if (fullnameValue == '') {
            setError(fullnameEle, 'This data must not be blank');
            isCheck = false;
        } else {
            setSuccess(fullnameEle);
        }
        
        if (emailValue == '') {
            setError(emailEle, 'This data must not be blank');
            isCheck = false;
        } else {
            setSuccess(emailEle);
        }

        if (numberphoneValue == '') {
            setError(numberphoneEle, 'This data must not be blank');
            isCheck = false;
        } else {
            setSuccess(numberphoneEle);
        }

        if (floatingSelectValue === '') {
            setError(floatingSelectEle, 'You have not selected Cinema information');
            isCheck = false;
        } else {
            setSuccess(floatingSelectEle);
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


    function resetForm(ele) {
        // Xóa lớp error và success
        Array.from(inputEles).forEach(ele => ele.classList.remove('error', 'success'));

        // Thêm lớp normal
        Array.from(inputEles).forEach(ele => ele.classList.add('normal'));
    }

    // Gọi hàm resetForm khi nút reset được nhấn
    document.getElementById('btn3').addEventListener('click', resetForm);


    // =====================END VALIDATION==============================


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
    $scope.loadAllSeat();
    $scope.loadAllRooms();
});
