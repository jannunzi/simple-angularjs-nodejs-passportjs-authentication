var app = angular.module('PassportApp', ['ngRoute']);

app.config(function($routeProvider, $httpProvider){
    $routeProvider
        .when('/', {
            templateUrl: '/views/main/main.html',
            controller: 'MainCtrl',
        })
        .when('/admin', {
            templateUrl: 'views/admin/admin.html',
            controller: 'AdminCtrl',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    
    $httpProvider
    .interceptors
    .push(function($q, $location)
    {
        return {
            response: function(response)
            { 
                return response;
            },
            responseError: function(response)
            {
                if (response.status === 401)
                    $location.url('/login');
                return $q.reject(response);
            }
        };
    }); 
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user)
    {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0')
            deferred.resolve();
        // User is Not Authenticated
        else
        {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });
    
    return deferred.promise;
};
