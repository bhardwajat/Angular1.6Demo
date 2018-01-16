angular.module("nestedApp", ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state("home", {
                url: '/home',
                templateUrl: 'home.html'
            })
            .state("home.list", {
                url: "/list",
                templateUrl: 'list.html',
                controller: function ($scope) {
                    $scope.top = ["stuff", "more stuff", "even more stuff", "and stuff 2 more times"];
                }
            })
            .state("home.list.topic",{
                url: '/list/topic',
                template: "You clicked a topic"
            })
            .state("home.news", {
                url: "/news",
                templateUrl: 'news.html'
            })

    })