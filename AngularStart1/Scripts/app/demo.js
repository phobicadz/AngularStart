
appRoot.controller('DemoController', function ($scope, $location, $resource, $modal, $log) {

    var userResource = $resource('/api/users', {}, { update: { method: 'PUT' } });

    //WL.init({ client_id: "000000004813F37C", redirect_uri: "http://adamandlindsey.co.uk" });

    //WL.login({ "scope": "wl.skydrive wl.signin" }).then(
    //function (response) {
    //    openFromSkyDrive();
    //},
    //function (response) {
    //    log("Failed to authenticate.");
    //}
    //);

    $scope.usersList = [];
    $scope.selectedUsers = [0];
    $scope.filterOptions = [];
    $scope.alerts = [
    { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.addAlert = function () {
        $scope.alerts.push({ msg: 'Another alert!' });
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };


    userResource.query(function (data) {
        $scope.usersList = [];
        angular.forEach(data, function (userData) {
            $scope.usersList.push(userData);
        });
    });

    $scope.$watchCollection('selectedUsers', function () {
        $scope.selectedUser = angular.copy($scope.selectedUsers[0]);
    });

    $scope.userGrid = {
        data: 'usersList',
        multiSelect: false,
        selectedItems: $scope.selectedUsers,
        filterOptions: $scope.filterOptions,
        enableColumnResize: false,
        columnDefs: [
            { field: 'firstName', displayName: 'First Name', width: '25%' },
            { field: 'lastName', displayName: 'Last Name', width: '25%' },
            { field: 'email', displayName: 'Email', width: '25%' },
            { field: 'mobile', displayName: 'Mobile Number', width: '25%' }
        ]
    };

    $scope.updateUser = function (user) {
        userResource.update(user, function (updatedUser) {
            $scope.selectedUsers[0].id = updatedUser.id;
            $scope.selectedUsers[0].firstName = updatedUser.firstName;
            $scope.selectedUsers[0].lastName = updatedUser.lastName;
            $scope.selectedUsers[0].gender = updatedUser.gender;
            $scope.selectedUsers[0].mobile = updatedUser.mobile;
            $scope.selectedUsers[0].email = updatedUser.email;
            $scope.selectedUsers[0].city = updatedUser.city;
            $scope.selectedUsers[0].state = updatedUser.state;
            $scope.selectedUsers[0].country = updatedUser.country;
            $scope.selectedUsers[0].zip = updatedUser.zip;
        });
    };

 
    $scope.countryList = [
        {
            name: 'USA', id: 'usa', states: [
                { name: 'Alabama', id: 'al', cities: [{ name: 'Alabaster', id: 'al' }, { name: 'Arab', id: 'ar' }, { name: 'Banks', id: 'bk' }] },
                { name: 'Alaska', id: 'as', cities: [{ name: 'Lakes', id: 'lk' }, { name: 'Kenai', id: 'kn' }, { name: 'Gateway', id: 'gw' }] },
                { name: 'New Jersey', id: 'nj', cities: [{ name: 'Atlanta', id: 'at' }, { name: 'Jersey', id: 'js' }, { name: 'Newark', id: 'nw' }] },
                { name: 'New York', id: 'ny', cities: [{ name: 'Kingston', id: 'kg' }, { name: 'Lockport', id: 'lp' }, { name: 'Olean', id: 'ol' }] },
                { name: 'Texas', id: 'tx', cities: [{ name: 'Dallas', id: 'dl' }, { name: 'Austin', id: 'as' }, { name: 'Houston', id: 'hs' }] }]
        }
    ];

    $scope.clearCityAndZip = function () {
        $scope.selectedUsers[0].city = null;
        $scope.selectedUsers[0].zip = "";
    };

    $scope.$watch('selectedUsers[0].state', function (selectedStateId) {
        if (selectedStateId) {
            angular.forEach($scope.countryList[0].states, function (state) {
                if (selectedStateId == state.id) {
                    $scope.selectedState = state;
                }
            });
        }
    });

    var init = function () {

    }

    init();

    // Kitten carousel
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];

    $scope.addSlide = function () {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: 'http://placekitten.com/' + newWidth + '/300',
            text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
              ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
    };

    for (var i = 0; i < 4; i++) {
        $scope.addSlide();
    }
    // Pussy End

    // Modal plopup
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                userList: function () {
                    return $scope.usersList;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
appRoot.controller('ModalInstanceCtrl', function ($scope, $modalInstance, userList) {

    $scope.items = userList;
    $scope.selected = {
        item: $scope.items[0].firstName
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

