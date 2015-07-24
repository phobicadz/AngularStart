appRoot.controller('TransactionController', function ($scope, $location, $resource, $modal) {

    // setup resource i.e api call with parameter.
    var TransactionResource = $resource('/api/query/:id', { id: '@TransactionId' });
    $scope.transactionListResource = $resource('/api/query/:name', { name: '@Name' });
    var transaction;

    $scope.transactionList = [];

    // paging stuff 
    $scope.pagingOptions = {
        pageSizes: [25, 50, 100],
        pageSize: 25,
        totalServerItems: 0,
        currentPage: 1
    };

    $scope.SearchTransactionClick = function () {

        $scope.SearchTransaction($scope.TransactionId);
    };

    // get a single transaction
    $scope.SearchTransaction = function (Id) {
        TransactionResource.get({ TransactionId: Id })
        .$promise.then(function (data) {
            $scope.transaction = data;
        });
    }

    // get a list of transactions
    $scope.transactionListResource.query({ Name: 'test1' }, function (data) {
  
        $scope.transactionList = [];
        angular.forEach(data, function (transactionData) {
            $scope.transactionList.push(transactionData);
        });

        $('#ajaxBusy').hide();
     });

    $scope.transactionGrid = {
        data: 'transactionList',
        selectedItems: [],
        multiSelect: false,
        enableColumnResize: true,
        pagingOptions: $scope.pagingOptions,
        enablePaging: true,
        showFooter: true,
        columnDefs: [
            { field: 'transactionID', displayName: 'ID' },
            { field: 'companyName', displayName: 'Company Name' },
            { field: 'campaignStatus', displayName: 'Campaign Status' },
            { field: 'productName', displayName: 'Product Name' },
            { field: 'entityStatusName', displayName: 'Entity Status Name' },
            { field: 'merchantName', displayName: 'Merchant Name' },
            { field: 'name', displayName: 'Name' },
            { field: 'policyDate', displayName: 'Policy Date', cellFilter: 'date:\'dd/MM/yyyy\'' }
           ]
    };




    // setup modal popup function. Note controller is defined below transaction controller

    // popup items
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl2',
            size: size,
            resolve: {
                transactionList: function () {
                    return $scope.transactionList;
                },
                selectedItem: function () {
               
                        return $scope.transactionGrid.selectedItems[0];
                   
                }
            }
        });
    };

    // page load functionallity
    var init = function () {
       
        $('#ajaxBusy').show();
        $scope.open('');


    }

   init();

  });


    // Please note that $modalInstance represents a modal window (instance) dependency.
    // It is not the same as the $modal service used above.
    appRoot.controller('ModalInstanceCtrl2', function ($scope, $modalInstance,transactionList, selectedItem) {

        $scope.items = transactionList;

        if (selectedItem == null)
        {
            $scope.selected = { item: null }
        }
        else
        {
            $scope.selected = {
                item: selectedItem.merchantName
            };
        }

        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });