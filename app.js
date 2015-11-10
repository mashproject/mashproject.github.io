'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ui.router']);
app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);


app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        /*$locationProvider.html5Mode(true);*/
        $stateProvider.
            /* PUBLIC PAGES */
            state('events', {
                url: '^/events/{id:int}',
                templateUrl: "Event.html",
                controller: 'singlEventCtrl'
            }).
            state('home', {
                url: '/',
                templateUrl: 'html/home.html',
                controller: 'eventCtrl'
            }).
            state('internship', {
                url: '/internship',
                templateUrl: 'internship.html'
            }).
            state('team', {
                url: '/team',
                templateUrl: 'team.html'
            }).
            state('partners', {
                url: '/partner',
                templateUrl: 'Partners.html'
            }).
            state('contributors', {
                url: '/contributors',
                templateUrl: 'Contributors.html'
            }).
            state('culture', {
                url: '/culture',
                templateUrl: 'Culture.html'
            })


    }]);

app.directive('appfooter', function () {
    return {
        templateUrl: "html/footer.html"
    };
});
app.directive('appheader', function () {
    return {
        templateUrl: "html/header.html"
    };
});

app.controller('eventCtrl', ['$scope', '$http', '$state',
    function ($scope, $http, $state) {
        // if(eventsData.length == 0){
            console.log('loading all published events');
            $http.get(HOST+'/events/?is_published=true').success(function (data) {
                console.log(data)
                $scope.events = data;
                for (var i=0; i<data.length; i++){
                    eventsData[data[i].id] = data[i];
                    eventsIds[i] = data[i].id
                    $scope.events[i].typeImage = eventsTypeDefaultImages[data[i].type_id]
                    $scope.events[i].pub_date = dateFormatter(data[i].pub_date)
                }
            });
        // }else{
        //     console.log("data already saved")
        //     $scope.events = eventsData
        //     for (var i=0; i<eventsIds.length; i++){
        //         console.log(eventsIds[i])
        //         console.log(eventsData[eventsIds[i]].type_id)
        //         console.log(eventsTypeDefaultImages[eventsData[eventsIds[i]].type_id])
        //         console.log(i)
        //         // console.log(eventsData[eventsIds[i]])
        //         $scope.events[eventsIds[i]].typeImage = eventsTypeDefaultImages[eventsData[eventsIds[i]].type_id]                
        //     }
        //     console.log($scope.events)
        // }
        $scope.open = function (id) {
            $state.go('events', {id: id});
        };
    }]);

app.controller('supportersCtrl', ['$scope', '$http', '$state',
    function ($scope, $http, $state) {        
        console.log('loading all supporters');
        $http.post(HOST+'/events/supporters', {"ids":globalSupportersIds}).success(function (data) {                    
            $scope.supporters = data;
            console.log(data)
            for(var i=0; i<data.length;i++){
                $scope.supporters[i].image_url = mediaHOST + $scope.supporters[i].image_url;                                
            }
        });        
    }]);

app.controller('singlEventCtrl', ['$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams) {
        var id = $stateParams.id;
        console.log('inside event ' + id.toString());
        if(eventsData[id] == null){            
            $http.get(HOST+'/events?id=' + id.toString()).success(function (data) {
                console.log("data of events rest call and loading fresh from net");
                $scope.event = data[0];
                $scope.event.pub_date = dateFormatter(data[0].pub_date)
                console.log(data);
                console.log({"ids":data[0].supporters});            
                $http.post(HOST+'/events/supporters', {"ids":data[0].supporters}).success(function (data) {
                    console.log(data)
                    $scope.supporters = data;
                    for(var i=0; i<data.length;i++){
                        $scope.supporters[i].image_url = mediaHOST + $scope.supporters[i].image_url;
                        supportersData[data[i].id] = data[i]
                    }
                    console.log("data of supporters rest call");                    
                });
            });
        }else{
            console.log("data not null");
            var event = eventsData[id];
            $scope.event = event;                
                console.log({"ids":event.supporters});
                $http.post(HOST+'/events/supporters', {"ids":event.supporters}).success(function (data) {
                    $scope.supporters = data;
                    for(var i=0; i<data.length;i++){
                        $scope.supporters[i].image_url = mediaHOST + $scope.supporters[i].image_url;
                        supportersData[data[i].id] = data[i]
                    }
                    console.log("data of supporters rest call");
                    // console.log(data);
                });
        }
        
    }]);

app.run(["$rootScope", "$anchorScroll" , function ($rootScope, $anchorScroll) {
    $anchorScroll.yOffset = 50;
    $rootScope.$on("$locationChangeSuccess", function () {
        $anchorScroll();
    });
}]);

app.controller('headerCtrl', ['$anchorScroll', '$location', '$scope',
    function ($anchorScroll, $location, $scope) {
        $scope.gotoAnchor = function (x) {
            var newHash = x;
            console.log($location.path(''));
            $location.replace();
            $scope.active = x;
            if ($location.hash() != newHash) {
                // set the $location.hash to `newHash` and
                // $anchorScroll will automatically scroll to it
                $location.hash(x);
            } else {
                // call $anchorScroll() explicitly,
                // since $location.hash hasn't changed
                $anchorScroll();
            }
        };
    }
]);


