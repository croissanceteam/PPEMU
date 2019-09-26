angular.module('app', ['datatables', 'datatables.buttons']).
controller('dashboard', function($scope, DTOptionsBuilder) {
    $scope.dtOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers') 
      .withDisplayLength(2)
      .withOption('order', [1, 'desc']).withButtons([{
    text: '<button class="btn">Some button</button>',
    key: '1',
    action: function(e, dt, node, config) {
      alert('Button activated');
    }
  }]);
});