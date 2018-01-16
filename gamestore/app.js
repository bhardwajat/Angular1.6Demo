var app = angular.module("GameStoreApp", ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider.state('products', {
        url: '/products',
        templateUrl: '/pages/productshome.html'
    });

    $stateProvider.state('product', {
        url: '/product?pid',
        templateUrl: '/pages/product.html'
    });

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/products');
});

app.controller("ProductHomeController", function ($scope, $http, productService) {
    $scope.title = "Products > All";
    $scope.selectedCategory = 'All';
    $scope.products = [];

    productService.getProducts(function (res) {
        $scope.products = res.data;
    }, null);

    $scope.getActiveClass = function (cat) {
        return $scope.selectedCategory == cat ? 'prodActive' : '';
    }

    $scope.selectCategory = function (cat) {
        if (cat) {
            $scope.selectedCategory = cat;
            var t = $scope.title.split(' > ');
            t = t[0];
            $scope.title = [t, $scope.selectedCategory].join(" > ")
        }
    }

    $scope.filterFn = function (p) {
        return $scope.selectedCategory == "All" ||
            p.category == $scope.selectedCategory;
    }

    $scope.$on('product-click', function (t) {
        console.log(t);
    })
});

app.controller("ProductController", function ($scope, $stateParams, $http, 
    $state, productService) {

    productService.getProductById($stateParams.pid, 
    function(res){
        $scope.prod = res.data;
    },
    function(){});

    $scope.goHome = function () {
        $state.go("products");
    }
});

app.filter("unique", function () {
    return function (data, property) {
        if (angular.isArray(data) && angular.isString(property)) {
            var results = [];
            var keys = {};
            for (var i = 0; i < data.length; i++) {
                var val = data[i][property];
                if (angular.isUndefined(keys[val])) {
                    keys[val] = true;
                    results.push(val);
                }
            }
            return results;
        } else {
            return data;
        }
    }
});

app.filter("limitString", function () {
    return function (data, limit) {
        if (angular.isString(data) && angular.isNumber(limit)) {
            var result = "";
            result = data.slice(0, limit);
            result += "...";
            return result;
        } else {
            return data;
        }
    }
})
    .directive("titleDirective", function () {
        return {
            template: "<h1>{{title}}</h1>"
        }
    })
    .directive("productDirective", function () {
        return {
            templateUrl: "/pages/productdirective.html",
            restrict: 'E',
            scope: {
                prod: "=product"
            }
        }
    });

app.service("productService", function ($http) {
    var self = this;

    self.getProducts = function (done, err) {
        $http({
            method: "GET",
            url: "http://localhost:2403/products"
        }).then(done, err);
    }

    self.getProductById = function (id, done, err) {
        if (!id) {
            err();
        }
        $http({
            method: "GET",
            url: "http://localhost:2403/products?id=" + id
        }).then(done, err);
    }
});
