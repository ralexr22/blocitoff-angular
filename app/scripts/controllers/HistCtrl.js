(function() {
  function HistCtrl($scope, $firebaseArray) {
    var ref = firebase.database().ref();
    var tasksRef = ref.child("tasks");

    $scope.list = [];
    $firebaseArray(tasksRef).$loaded().then(function(data){
      for(var i = 0; i < data.length; i++) {
        var item = data[i];
        var itemDate = new Date(item.date);
        var sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        item.isOld = (itemDate <= sevenDaysAgo) || item.isCompleted 
        $scope.list.push(item);
        $scope.newTask ="";
      }
    });
  }

angular
.module('blocitoff')
.controller('HistCtrl', ["$scope", "$firebaseArray", HistCtrl]);
})();
