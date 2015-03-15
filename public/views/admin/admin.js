app.controller('AdminCtrl', function($scope, $http, $location)
{    
    $scope.logout = function()
    {
        $http.post('/logout')
        .success(function(response)
        {
            $location.path("/");
        });
    }
});