(function(){
	'use strict';
	
	angular.module('app', [])i
	.factory('login', function($http){
		var loginInfo = {};
		var changes = [];
		var change = function(data){
			changes.forEach(function(fn){
				fn(data);
					});
					loginInfo.info=data;
					return loginInfo;
				}
		return{
			login: function(user){
				return $http.post('/api/login', user).then(change);
			},
			logout: function(){
				return $http.delete('/api/login').then(change);
			},
			isLogin: function(){
				return $http.get('api/login').then(change);
			},
			loginInfo: loginInfo,
			onchange: function(fn){
					changes.push(fn);
			},
			};
		})
/*	.service('login1',function($http){
			this.login = function(){};
			this.logout = function(){};
			this.isLogin = function(){};
		})
*/
	.controller('MainCtrl',['$scope', 'login', function($scope,login){
			login.isLogin();
			$scope.logout = function(){
				login.logout();
			};
			login.onchange(function(data){
				$scope.loginInfo = data.data;
			});
		/*	$scope.$watch(function(){
			return login.loginInfo.username;
			}, function(n,o){
				if(!!n)$scope.user = {
			username:n
				}
			else $scope.user = undefined;
			});*/
		}])

	.controller('LoginCtrl', ['login', '$scope', 
			function(login, $scope){
			var self = this;
			login.Login(user);
			};
			/*$scope.$watch(function(){
			return login.loginInfo.username;
			}, function(n,o){
				if(!!n) self.user = {
				username: n
			};
			else self.user = undefined;
			});*/
			login.onchange(function(data){
				self.loginInfo = data.data;
				});
	
		
	/*.controller('LoginCtrl',['$scope', '$http', '$rootScope', 
		function($scope, $http, $rootScope){
		var self = this;
		$scope.$on('logout', function(){
			self.user=undefined;;
			})
		$http.get('/api/login').success(function(resp){
			if(resp.username){
			self.user = resp;
			$rootScope.$broadcast('login success', self.user);
			}
		});
		self.login = function(user){
			$http.post('/api/login', user).then(function(data){
				if(data.data.username){	
				self.user = {
					username:data.data.username
				};
				$rootScope.$broadcast('login success', self.user);
					}
				else self.msg = data.data.msg;
			});
		    }
		/*	self.logout = function(){
		        $http.delete('/api/login').success(function(){
			self.user=undefined
			})
			};*/

		}
	]);
})();
