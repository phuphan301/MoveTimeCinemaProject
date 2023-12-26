let host = "http://localhost:8080/api/cinema";
let host_customer = "http://localhost:8080/api";
const app = angular.module("app", []);
app.controller("controller", function ($scope, $http) {
    $scope.form = {};
    $scope.cinemas = [];

    $scope.reset = function () {
        $scope.form = {};
    }

    $scope.loadAllCinemas = function () {
        var url = `${host}/all`;
        $http.get(url).then(resp => {
            $scope.cinemas = resp.data;
            console.log("AllCinemas", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }


    // =====================VALIDATION==============================
    $scope.checkAndcreateCinema = function () {
        // Xử lý kiểm tra và validation ở đây
        var isValid = checkValidate();

        if (isValid) {
            // Nếu validation thành công, gọi createMovie()
            $scope.createCinemas();
        }
    };
    $scope.checkAndupdateCinema = function () {
        // Xử lý kiểm tra và validation ở đây
        var isValid = checkValidate();

        if (isValid) {
            // Nếu validation thành công, gọi createMovie()
            $scope.updateCinema();
        }
    };

    const nameEle = document.getElementById('name');
    const addressEle = document.getElementById('address');

    const btnCinema1 = document.getElementById('btn1');
    const btnCinema2 = document.getElementById('btn2');
    const inputEles = document.querySelectorAll('.form-group');
    // Nếu nhảy lỗi console đến đây thì copy 3 nút thêm,sửa, resset qua file html chứa file js này rồi chỉnh hidden
    btnCinema1.addEventListener('click', function () {
        Array.from(inputEles).map((ele) =>
            ele.classList.remove('success', 'error')
        );
    });
    btnCinema2.addEventListener('click', function () {
        Array.from(inputEles).map((ele) =>
            ele.classList.remove('success', 'error')
        );
    });

    function checkValidate() {
        let nameValue = nameEle.value;
        let addressValue = addressEle.value;

        let isCheck = true;

        if (nameValue == '') {
            setError(nameEle, 'This data must not be blank');
            isCheck = false;
        } else {
            setSuccess(nameEle);
        }

        if (addressValue == '') {
            setError(addressEle, 'This data must not be blank');
            isCheck = false;
        } else {
            setSuccess(addressEle);
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



    $scope.createCinemas = function () {
        var cinema = angular.copy($scope.form);
        var url = `${host}`;
        $http.post(url, cinema).then(resp => {
            $scope.cinemas.push(cinema);
            $scope.reset();
            $scope.loadAllCinemas();
            console.log("CinemasNew", resp);
        }).catch(error => {
            console.log(error);
        })
    }

    $scope.updateCinema = function () {
        var cinema = angular.copy($scope.form);
        var url = `${host}/${$scope.form.id}`;
        $http.put(url, cinema).then(resp => {
            var index = $scope.cinemas.findIndex(cinema => cinema.id == $scope.form.id);
            $scope.cinemas[index] = resp.data;
            console.log("Updatecinemas", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.edit = function (id) {
        var url = `${host}/${id}`;
        $http.get(url).then(resp => {
            $scope.form = resp.data;
            console.log("CinemaEdit", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.delete = function (id) {
        var url = `${host}/${id}`;
        $http.delete(url).then(reps => {
            var index = $scope.cinemas.findIndex(cinema => cinema.id == id);
            $scope.cinemas.splice(index, 1);
            console.log("cinemasDelete", reps);
        }).catch(error => {
            console.log("Rạp phim không thể xóa vì đang có dữ liệu con");
            //console.log("Error", error);
            alert("Rạp phim không thể xóa vì đang có dữ liệu con");
        })
    }

    //phan trang
    $scope.pager = {
        page: 0,
        size: 10,
        get items() {
            var start = this.page * this.size;
            return $scope.cinemas.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.cinemas.length / this.size)
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
        var thElements = document.querySelectorAll('#cinemastable thead th');
        thElements.forEach(function (th) {
            headers.push(th.innerText);
        });

        var trElements = document.querySelectorAll('#cinemastable tbody tr');
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
        XLSX.writeFile(workbook, 'Cinemas_Data.xlsx');
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
        var trElements = document.querySelectorAll('#cinemastable tbody tr');

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
                doc.text('Cinemas Data', 14, 15);
            }
        });

        // Tải file PDF
        if (doc) {
            doc.save('Cinemas_Data.pdf');
        } else {
            console.error("Không thể tạo đối tượng jsPDF");
        }
    };

    // Hàm để lấy tên cột từ bảng trên giao diện
    $scope.getTableColumns = function () {
        var columns = [];

        // Kiểm tra xem phần tử #cinemastable có tồn tại hay không
        var tableElement = document.getElementById('cinemastable');

        if (tableElement) {
            // Lấy tên cột từ bảng trên giao diện
            var headerCells = tableElement.querySelectorAll('thead th');
            headerCells.forEach(function (th) {
                columns.push({ title: th.textContent, dataKey: th.textContent });
            });
        } else {
            console.error("Không tìm thấy phần tử #cinemastable");
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
    $scope.loadAllCinemas();
});