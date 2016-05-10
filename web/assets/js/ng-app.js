angular
    .module('Main', [])
    .controller('ProductsController', function ($scope, $http) {
        $scope.products = {};
        $scope.cart = {};

        $http.get('/api/potion/')
            .then(function (response) {
                $scope.products = response.data.potions;
            })
        ;


        function getCartTotal() {
            return Object.keys($scope.cart).reduce(function (carry, i) {
                return carry + ($scope.products[i].price * $scope.cart[i]);
            }, 0);
        }
        function getCartTotalItems() {
            return Object.keys($scope.cart).reduce(function (carry, i) {
                return carry + $scope.cart[i];
            }, 0);
        }
        function getQuantity(product) {
            if ($scope.cart.hasOwnProperty(product.id)) {
                return $scope.cart[product.id];
            }
            return 0;
        }
        function changeQuantity(product, f) {
            var quantity = f(getQuantity(product));
            if (quantity < 0) quantity = 0;
            setQuantity(product, quantity);
        }
        function setQuantity(product, quantity) {
            $scope.cart[product.id] = quantity;
        }


        $scope.addProduct = function (product) {
            changeQuantity(product, function (q) { return q + 1 });
        };
        $scope.removeProduct = function (product) {
            changeQuantity(product, function (q) { return q - 1 });
        };
        $scope.getQuantity = getQuantity;
        $scope.getCartTotal = getCartTotal;
        $scope.getCartTotalItems = getCartTotalItems;
    })
;
