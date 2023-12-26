let host = "http://localhost:8080/api/resetPassword";
const app = angular.module("app", []);

app.controller("controller", function($scope, $http) {
	$scope.findEmail = function(email) {
    var url = `${host}/${email}`;
    	$http.get(url).then(resp => {
        	console.log(resp.data.id);
        	if (resp.data.id == null) {
            	alert("Email không tồn tại");
        	}else{
				window.location.href = `http://localhost:8080/changePassword/` + resp.data.id;
			}
    	}).catch(error => {
        	console.log("Error", error);
    	});
	};
});