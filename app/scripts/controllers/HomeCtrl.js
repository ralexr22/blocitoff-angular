(function() {
  function HomeCtrl($scope, $firebaseArray) {
    var ref = firebase.database().ref();
    var tasksRef = ref.child("tasks");

    $scope.list = [];
    $scope.newTask = {
      name: "",
      date: (new Date()).toLocaleDateString(),
      isCompleted: false,
      priority: 0
    };

    $scope.createNewTask = function() {
      var tasks = $firebaseArray(tasksRef);
      tasks.$add($scope.newTask).then(function(item){
        console.log(item)
        $scope.list.push(item);
      });
      // set $scope.newTask to a new object.
      $scope.newTask = {
        name: "",
        date: (new Date()).toLocaleDateString(),
        isCompleted: false,
        priority: 0
      };
    };

    $scope.toggleCompleted = function(item) {
      item.isCompleted = true;
      var taskRef = tasksRef.child(item.$id);
      taskRef.update({ isCompleted: true })
    }

    $firebaseArray(tasksRef).$loaded().then(function(data){
      for(var i = 0; i < data.length; i++) {
        var item = data[i];
        var itemDate = new Date(item.date);
        var sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        item.isOld = (itemDate <= sevenDaysAgo) || item.isCompleted
        $scope.list.push(item);

      
      }
    });
  }


  angular
  .module('blocitoff')
  .controller('HomeCtrl', ["$scope", "$firebaseArray", HomeCtrl]);
})();
