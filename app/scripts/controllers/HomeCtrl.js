(function() {
  function HomeCtrl($scope, $firebaseArray) {
    var ref = firebase.database().ref();
    var tasksRef = ref.child("tasks");
    $scope.list = [];
    $firebaseArray(tasksRef).$loaded().then(function(data){
      for(var i = 0; i < data.length; i++) {
        $scope.list.push(data[i]);
      }
    });
  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ["$scope", "$firebaseArray", HomeCtrl]);
})();
