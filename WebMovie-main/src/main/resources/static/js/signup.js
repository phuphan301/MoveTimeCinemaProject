let host = "http://localhost:8080/add/userNoExist";
let movie_scheduled = "http://localhost:8080/api/movie_scheduled";
let host_customer = "http://localhost:8080/api";
const app = angular.module("app", []);
app.controller("controller", function ($scope, $http, $filter, $timeout) {
    $scope.form = {};
    $scope.customers = [];

    $scope.reset = function () {
        $scope.form = {};
    }

    $scope.loadAllCustomers = function () {
        var url = `${host_customer}/user`;
        $http.get(url).then(resp => {
            $scope.customers = resp.data;
            console.log("AllCustomers", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }
    $scope.showSuccessMessage = false;
    $scope.createCustomer = function () {
        var customer = angular.copy($scope.form);
        var url = `${host}`;
        $http.post(url, customer).then(resp => {
            $scope.customers.push(customer);
            $scope.reset();
            console.log("CustomerNew", resp);

            $scope.showSuccessMessage = true;
            $timeout(function () {
                $scope.showSuccessMessage = false;
                window.location.href = `http://localhost:8080/signin`;
            }, 5000);
            // alert("Đăng ký thành công");


        }).catch(error => {

            console.log(error);
        })
    }


    // =====================VALIDATION==============================
    $scope.checkAndcreateCustomer = function () {
        // Xử lý kiểm tra và validation ở đây
        var isValid = checkValidateSignup();

        if (isValid) {

            // Nếu validation thành công, gọi createMovie()
            $scope.createCustomer();
        }
    };

    const fullnameEle = document.getElementById('name_signup');
    const emailEle = document.getElementById('email_signup');
    const numberphoneEle = document.getElementById('phonenumber_signup');
    const password_signupEle = document.getElementById('password_signup');
    const usernameEle = document.getElementById('username');
    const passwordEle = document.getElementById('password');

    const btnSignin = document.getElementById('btn1');
    const btnSignup = document.getElementById('btn2');
    const inputEles = document.querySelectorAll('.form-group');

    btnSignin.addEventListener('click', function () {
        Array.from(inputEles).map((ele) =>
            ele.classList.remove('success', 'error')
        );

    });

    btnSignup.addEventListener('click', function () {
        Array.from(inputEles).map((ele) =>
            ele.classList.remove('success', 'error')
        );
    });


    //--------------------- Sign in------------
    function checkValidateSignin() {
        let usernameValue = usernameEle.value;
        let passwordValue = passwordEle.value;


        let isCheck = true;

        if (usernameValue == '') {
            setError(usernameEle, '***');
            isCheck = false;
        } else if (!isEmail(usernameValue)) {
            setError(usernameEle, '*Email format xyz@gmail.com');
            isCheck = false;
        } else {
            setSuccess(usernameEle);
        }

        if (passwordValue == '') {
            setError(passwordEle, '***');
            isCheck = false;
        } else {
            setSuccess(passwordEle);
        }

        return isCheck;
    }


    // --------------Sign up---------------------
    function checkValidateSignup() {
        let fullnameValue = fullnameEle.value;
        let emailValue = emailEle.value;
        let numberphoneValue = numberphoneEle.value;
        let password_signupValue = password_signupEle.value;


        let isCheck = true;


        if (fullnameValue == '') {
            setError(fullnameEle, '***');
            isCheck = false;
        } else if (!isFullname(fullnameValue)) {
            setError(fullnameEle, '*With at least 2 words');
            isCheck = false;
        } else {
            setSuccess(fullnameEle);
        }

        if (emailValue == '') {
            setError(emailEle, '***');
            isCheck = false;
        } else if (!isEmail(emailValue)) {
            setError(emailEle, '*xyz@gmail.com');
            isCheck = false;
        } else if (isEmailExists(emailValue)) {
            setError(emailEle, '*The email has been used!');
            isCheck = false;
        } else {
            setSuccess(emailEle);
        }

        if (numberphoneValue == '') {
            setError(numberphoneEle, '***');
            isCheck = false;
        } else if (!isPhone(numberphoneValue)) {
            setError(numberphoneEle, '*+84 xxx xxx xxx');
            isCheck = false;
        } else {
            setSuccess(numberphoneEle);
        }

        if (password_signupValue == '') {
            setError(password_signupEle, '***');
            isCheck = false;
        } else if (!isPassword(password_signupValue)) {
            setError(password_signupEle, '*[6-16] characters and 1 !@#$%^&*');
            isCheck = false;
        } else {
            setSuccess(password_signupEle);
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


    function isFullname(fullname) {
        // Kiểm tra xem fullname có ít nhất 2 chuỗi ký tự không
        return /^(\D+\s){1}\D+$/.test(fullname);
    }

    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );
    }
    function isEmailExists(email) {
        return $scope.customers.some(function (customer) {
            return customer.email === email;
        });
    };

    function isPhone(number) {
        return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
    }

    function isPassword(password) {
        // Kiểm tra xem mật khẩu có ít nhất 6 ký tự, tối đa 16 ký tự, và chứa ít nhất một ký tự đặt biệt
        return /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,16}$/.test(password);
    }
    // =====================END VALIDATION==============================


    $scope.showUploadSuccessMessage = false;
    //upload hinh anh
    $scope.imageChanged = function (files) {
        var data = new FormData();
        data.append('file', files[0]);
        $http.post('http://localhost:8080/rest/upload/images', data, {
            transformRequest: angular.indentity,
            headers: { 'Content-Type': undefined }
        }).then(resp => {
            $scope.form.avatar = resp.data.name;
            $scope.showUploadSuccessMessage = true; // Hiển thị thông báo khi ảnh đã tải lên
        }).catch(error => {
            alert("loi updoad hinh")
            console.log(error)
        })
    }



    $scope.movie_scheduleds = [];
    $scope.searchQuery = '';
    $scope.searchResults = [];

    $scope.loadAllMovie_Scheduleds = function () {
        var url = `${movie_scheduled}/all`;
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

            // Lọc danh sách movie_scheduleds theo name và ngày hiện tại trở đi
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


    $scope.loadAllCustomers();
    $scope.loadAllMovie_Scheduleds();
});