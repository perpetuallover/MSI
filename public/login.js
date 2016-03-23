
(function(){
'use strict';
angular.module('app').directive('myLogin', function(){
	return{
		templateUrl: 'login.html',
		scope:{
			username: '='
		},
		controller: 'LoginCtrl as loginCtrl'
		 };
	});
})();

