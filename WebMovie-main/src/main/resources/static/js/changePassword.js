let host_c="http://localhost:8080/api";
const app = angular.module("app", []);

app.controller("controller", function($scope, $http, $timeout) {

	var url = window.location.href;
	var parts = url.split('/');
	var idCustomers = parts[parts.length - 1];
	
	
	$scope.changePassword = function () {
        if ($scope.form.password1 === $scope.form.password2) {
			var url = window.location.href;
			var parts = url.split('/');
			var idCustomers = parts[parts.length - 1];
			$scope.updateCustomer(idCustomers);
			
			$timeout(function() {
		        window.location.href = `http://localhost:8080/home`;
		    }, 5000);
        } else {
            alert("Passwords do not match");
        }
    };
    
/*    $scope.checkoutForm = function () {
		var url = window.location.href;
		var parts = url.split('/');
		var idCustomers = parts[parts.length - 1];
		$scope.edit(idCustomers);
    };*/
    
    
    
    $scope.form = {};
    $scope.customers = [];
    $scope.loadAllCustomers = function(){
        var url = `${host_c}/user`;
        $http.get(url).then(resp=>{
            $scope.customers = resp.data;
            console.log("AllCustomers", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }
    
    $scope.updateCustomer = function(idCustomers) {
	    var data = {
	        id: $scope.form.id,
	        role: $scope.form.role,
	        password: $scope.form.password1,
	        fullname: $scope.form.fullname,
	        phonenumber: $scope.form.phonenumber,
	        email: $scope.form.email
	    };
	
	    var url = `${host_c}/user/v1/${idCustomers}`;
	
	    console.log("Updating customer with data:", data);
	    console.log("Using URL:", url);
	
	    $http.put(url, data).then(resp => {
	        var index = $scope.customers.findIndex(cust => cust.id == $scope.form.id);
	        $scope.customers[index] = resp.data;
	        console.log("UpdateCustomer", resp);
	    }).catch(error => {
	        console.log("Error updating customer", error);
	    });
	};
    
    edit(idCustomers);
    
    function edit(idCustomers){
        var url = `${host_c}/find/${idCustomers}`;
        $http.get(url).then(resp=>{
            $scope.form = resp.data;
            console.log("CustomerEdit", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }
    
    $scope.loadAllCustomers();
});