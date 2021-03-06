cdbmanager.service('namedMaps', ["MapsClient", function (MapsClient) {
    var self = this;

    this.api = new MapsClient();

    this.current = null;

    this.setCurrent = function (namedMap) {
        self.current = namedMap;
    };

    this.get = function () {
        self.api.get();
    };
}]);

cdbmanager.controller('namedMapSelectorCtrl', ["$scope", "nav", "namedMaps", "endpoints", "settings", function ($scope, nav, namedMaps, endpoints, settings) {
    $scope.nav = nav;

    $scope.currentNamedMap = null;

    $scope.showNamedMap = function (namedMap) {
        namedMaps.setCurrent(namedMap);
    };

    // update function list in scope when current endpoint changes
    $scope.$watch(function () {
        return endpoints.current;
    }, function () {
        namedMaps.get();
    }, true);

    // update named map list in scope when show namd maps from builder settings change
    $scope.$watch(function () {
        return settings.showBuilderNamedMaps;
    }, function () {
        namedMaps.get();
    });

    // keep the named map list in the scope always updated
    $scope.$watch(function () {
        return namedMaps.api.items;
    }, function (namedMapList) {
        $scope.namedMaps = namedMapList;
    });

    // update current named map pointer in scope when a new name map is selected
    $scope.$watch(function () {
        return namedMaps.current;
    }, function (currentNamedMap) {
        $scope.currentNamedMap = currentNamedMap;
    });

    namedMaps.get();
}]);

cdbmanager.controller('namedMapCtrl', ["$scope", "nav", "namedMaps", "endpoints", "$timeout", function ($scope, nav, namedMaps, endpoints, $timeout) {
    $scope.nav = nav;

    $scope.showVisualization = function () {
        var namedMap = namedMaps.current;

        nav.setCurrentView("namedMap.visualization");
        // We need to make sure the map is not created in an invisible area of the page, otherwise it won't render correctly
        $timeout(function () {
            $("#named_map").replaceWith('<div id="named_map" style="height: 500px"></div>');

            var map = L.map('named_map', {
                zoomControl: false,
                center: [43, 0],
                zoom: 3
            });

            L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://carto.com/attributions">CARTO</a>'
            }).addTo(map);

            cartodb.createLayer(map, {
                user_name: endpoints.current.account,
                type: 'namedmap',
                options: {
                    named_map: {
                        name: namedMap.name
                    }
                }
            }).addTo(map)
        });
    };

    // show map when selected map changes
    $scope.$watch(function () {
        return namedMaps.current;
    }, function (currentNamedMap) {
        if (currentNamedMap) {
            $scope.showVisualization();
        }
    });
}]);
