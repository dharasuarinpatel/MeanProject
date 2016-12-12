//"https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.js"

var app = angular.module('myApp', []);

app.controller('myCtrl', ['$scope','$http','$log', '$interval', function($scope, $http, $log, $interval) {

    
      var count = 0;
    $scope.players = [];

    // $http.get('/getPlayer/' + count).success(function(response){

    // 	$scope.players.push(response);
    // 	console.table(response);

    // }).error(function(status){
    // 	alert(status);
    // })
    
    

    
//Used interval to call http restful api at every 0.5 s = 500 miliseconds
    $interval(function () {
        count++;
        if(count <=100)
        {
            // $http.get('https://api.mlab.com/api/1/databases/heroku_w9ktr09s/collections/players?apiKey=nXgoAnvnz6pqzRGEC5HJA4HIS8Zd2fv0&f={"_id":0}&q={"PlayerID":' + count + '}&l=1')
            $http.get('/getPlayer/' + count)
                .success(function (response) {

                    // Merges Player array with new object because every object were being stored as different array in main player array
                    // $scope.players.push.apply($scope.players, response);

                    // It will concate two arrays (response and $scope.players) and stores the result into $scope.player
                    $scope.player = response;
                    $scope.players = $scope.players.concat(response);

                    if(count>20)
                    {
                        //Only 20 record should be displayed in table.So, used splice (index=0=position of record,howmany=1=number of records to be deleted) to delete first record to display new one
                        $scope.players.splice(0,1);
                    }
                }).error(function (data, status, headers, config) {
                alert(status);
            });
        }

    },500);

    function dtafetching() {
        
    }
                            
}]);