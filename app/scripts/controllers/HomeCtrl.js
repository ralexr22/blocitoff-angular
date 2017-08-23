(function() {
  function HomeCtrl($scope, $firebaseArray) {
    var ref = firebase.database().ref();
    var tasksRef = ref.child("tasks");
    var today = new Date();
    var month = (today.getMonth()+1);
    var day = today.getDate();
    var year = today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes();
    var age = (today.getDate()) - day

    $scope.list = [];
    $firebaseArray(tasksRef).$loaded().then(function(data){
      for(var i = 0; i < data.length; i++) {
        $scope.list.push(data[i]);
      }
    });

    $scope.old = function(){
      if (age == 1 ) {
        return true
      } else {
        return false
      }
    }
  }


  angular
  .module('blocitoff')
  .controller('HomeCtrl', ["$scope", "$firebaseArray", HomeCtrl]);
})();
