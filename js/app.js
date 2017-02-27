(function() {

    var app = angular.module('app', []);

    app.controller('myCtrl', function ($scope, $http) {

        $scope.ratingarray = [];
        $scope.hidearray = [];

        $scope.searchtv = function (tvshow) {

            var url = "http://www.omdbapi.com/?t=" + tvshow + "&Season=1";

            $http.get(url)
                .then(function (response) {
                    $scope.ids = [];
                    $scope.ratings = [];

                    var getobject = response.data.Episodes;
                    $scope.title = response.data.Title;

                    getobject.forEach(function (element) {
                    var id = element.imdbID;
                    var rating = element.imdbRating;
                    $scope.ratings.push(parseFloat(rating));
                    $scope.ids.push(id);
                    });

                    $scope.info = [];
                    $scope.sum = $scope.ratings.reduce(function(pv, cv) { return pv + cv; }, 0);
                    $scope.avg = ($scope.sum/$scope.ids.length).toFixed(2);
                    $scope.getDetails($scope.ids);
                });
        };

        $scope.getDetails = function (ids) {

            ids.forEach(function(id){
                $http.get("http://www.omdbapi.com/?i=" + id)
                    .then(function (episoderesponse) {
                        $scope.info.push(episoderesponse);
                    });
            });
        };

        $scope.myStyle = function(rate){

            if(parseFloat(rate) >8.5){
                return 'background-color:#6ba3ff;';
            }
        };

        $scope.init = function(){
          $scope.searchtv('Silicon Valley');
        };

        $scope.date2Month = function(date){

            var date = new Date(date),
            locale = "en-us",
            month = date.toLocaleString(locale, { month: "long" });

            return month;
        };


        $scope.removetv = function (index) {
            $scope.info.splice(index,1);
        };

    });


})();