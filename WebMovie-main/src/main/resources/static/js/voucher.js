let host = "http://localhost:8080/api/voucher";
let host_customer = "http://localhost:8080/api";
const app = angular.module("app", []);
app.controller("controller", function ($scope, $http, $filter) {
    $scope.form = {};
    $scope.vouchers = [];

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

    $scope.loadAllVoucher = function () {
        var url = `${host}/all`;
        $http.get(url).then(resp => {
            $scope.vouchers = resp.data;
            console.log("VoucherAll", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    // ================================================================
    // ========================VALIDATION==============================
    $scope.checkAndcreateVoucher = function () {
        // Xử lý kiểm tra và validation ở đây
        var isValid = checkValidate();

        if (isValid) {
            // Nếu validation thành công, gọi createVoucher()
            $scope.createVoucher();
        }
    };
    $scope.checkAndupdateVoucher = function () {
        // Xử lý kiểm tra và validation ở đây
        var isValid = checkValidate();

        if (isValid) {
            // Nếu validation thành công, gọi createVoucher()
            $scope.updateVoucher();
        }
    };
    const nameEle = document.getElementById('name');
    const discountEle = document.getElementById('discount');
    const date_STARTEle = document.getElementById('date_START');
    const date_ENDEle = document.getElementById('date_END');
    const describeEle = document.getElementById('describe');

    const btnVoucher1 = document.getElementById('btn1');
    const btnVoucher2 = document.getElementById('btn2');
    const inputEles = document.querySelectorAll('.form-group');
	// Nếu nhảy lỗi console đến đây thì copy 3 nút thêm,sửa, resset qua file html chứa file js này rồi chỉnh hidden
    btnVoucher1.addEventListener('click', function () {
        Array.from(inputEles).map((ele) =>
            ele.classList.remove('success', 'error')
        );
    });
    btnVoucher2.addEventListener('click', function () {
        Array.from(inputEles).map((ele) =>
            ele.classList.remove('success', 'error')
        );
    });

    function checkValidate() {
        let nameValue = nameEle.value;
        let discountValue = discountEle.value;
        let date_STARTValue = date_STARTEle.value;
        let date_ENDValue = date_ENDEle.value;
        let describeValue = describeEle.value;

        let isCheck = true;

        if (nameValue == '') {
            setError(nameEle, 'This data must not be blank');
            isCheck = false;
        } else {
            setSuccess(nameEle);
        }


        if (discountValue == '') {
            setError(discountEle, 'This data must not be blank');
            isCheck = false;
        } else if (!isDiscount(discountValue)) {
            setError(discountEle, 'Date is not in the correct format');
            isCheck = false;
        } else {
            setSuccess(discountEle);
        }

        if (date_STARTValue == '') {
            setError(date_STARTEle, 'This data must not be blank');
            isCheck = false;
        } else {
            setSuccess(date_STARTEle);
        }

        if (date_ENDValue == '') {
            setError(date_ENDEle, 'This data must not be blank');
            isCheck = false;
        } else {
            setSuccess(date_ENDEle);
        }
        if (describeValue == '') {
            setError(describeEle, 'This data must not be blank');
            isCheck = false;
        } else {
            setSuccess(describeEle);
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
    function isDiscount(number) {
        return /^([1-9]\d?|100)$/.test(number);
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




    $scope.createVoucher = function () {
        var voucher = angular.copy($scope.form);
        var url = `${host}`;
        $http.post(url, voucher).then(resp => {
            $scope.vouchers.push(voucher);
            $scope.reset();
            $scope.loadAllVoucher();
            console.log("VoucherNew", resp);
        }).catch(error => {
            console.log(error);
        })
    }

    $scope.updateVoucher = function () {
        var voucher = angular.copy($scope.form);
        var url = `${host}/${$scope.form.id}`;
        $http.put(url, voucher).then(resp => {
            var index = $scope.vouchers.findIndex(voucher => voucher.id == $scope.form.id);
            $scope.vouchers[index] = resp.data;
            $scope.updateStatusVoucher();
            console.log("Updatevoucher", resp);

        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.edit = function (id) {
        var url = `${host}/${id}`;
        $http.get(url).then(resp => {
            $scope.form = resp.data;
            resp.data.date_START = new Date(resp.data.date_START);
            resp.data.date_END = new Date(resp.data.date_END);
            console.log("MovieEdit", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    //reset
    $scope.reset = function () {
        $scope.form = {}
    }

    $scope.updateStatusVoucher = function () {
        var url = `${host}/updateStatusVoucher`;
        $http.get(url).then(resp => {

        })
    }

    //phan trang
    $scope.pager = {
        page: 0,
        size: 10,
        get items() {
            var start = this.page * this.size;
            return $scope.vouchers.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.vouchers.length / this.size)
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
		var thElements = document.querySelectorAll('#vouchertable thead th');
		thElements.forEach(function (th) {
			headers.push(th.innerText);
		});

		var trElements = document.querySelectorAll('#vouchertable tbody tr');
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
		XLSX.writeFile(workbook, 'Voucher_Data.xlsx');
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
		var trElements = document.querySelectorAll('#vouchertable tbody tr');
	
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
				doc.text('Voucher Data', 14, 15);
			}
		});
	
		// Tải file PDF
		if (doc) {
			doc.save('Voucher_Data.pdf');
		} else {
			console.error("Không thể tạo đối tượng jsPDF");
		}
	};

	// Hàm để lấy tên cột từ bảng trên giao diện
	$scope.getTableColumns = function () {
		var columns = [];

		// Kiểm tra xem phần tử #vouchertable có tồn tại hay không
		var tableElement = document.getElementById('vouchertable');

		if (tableElement) {
			// Lấy tên cột từ bảng trên giao diện
			var headerCells = tableElement.querySelectorAll('thead th');
			headerCells.forEach(function (th) {
				columns.push({ title: th.textContent, dataKey: th.textContent });
			});
		} else {
			console.error("Không tìm thấy phần tử #vouchertable");
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
    $scope.loadAllVoucher();
    $scope.updateStatusVoucher();
})