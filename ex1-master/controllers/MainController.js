app.controller("MainController", [
  "$scope",
  "MyService",
  function($scope, MyService) {
    MyService.getData().then(function(data) {
      $scope.tree = data.children.organisation;
      $scope.tree.forEach(function(element) {
        element.checked = false;
        if (element.children.site) {
         /*  element.init = function(){
            this.children.parent = this;
            delete this.init;
            return this;
          };
          element.init();
          console.log(element.children.code + " son of "+ element.children.parent.code); */
          element.children.site.forEach(function(element) {
            element.checked = false;
          });
        }
        if (element.children.organisation.length > 0) {
          element.children.organisation.forEach(element => {
            element.checked = false;
            if (element.children.site) {
              element.children.site.forEach(element => {
                element.checked = false;
              });
            }
            if (element.children.organisation.length > 0) {
              element.children.organisation.forEach(element => {
                element.checked = false;
                if (element.children.site) {
                  element.children.site.forEach(element => {
                    element.checked = false;
                  });
                }
              });
            }
          });
        }
        $scope.treeClone = $scope.tree;
      });
    });

    $scope.selectedItems = [];
    $scope.getSelected = function() {
      $scope.selectedItems = [];
      function checkChildren(c) {
        angular.forEach(c.children, function(c) {
          if (c.checked) {
            $scope.selectedItems.push({ selected: c.name });
          }
          checkChildren(c);
        });
      }
      angular.forEach($scope.tree, function(value, key) {
        if (value.checked) {
          $scope.selectedItems.push({ selected: value.name });
        }
        checkChildren(value);
      });
    };
    $scope.$watch("searchString", function() {
      
 
      
      $scope.treeClone = JSON.parse(JSON.stringify($scope.tree));
      $scope.treeClone.forEach(item => {
        if (item.children.site) {
          item.children.site = item.children.site.filter(function(
            returnableObj
          ) {
            return (
              returnableObj.code.toLowerCase().indexOf($scope.searchString) !==
              -1
            );
          });
          if(item.children.site.length > 0){
            item.childrenVisibility = false;
          }
        }
         if (item.children.organisation.length > 0) {
          item.children.organisation.forEach(function(element) {
              if(element.children.site){
                  element.children.site = element.children.site.filter(returnableObj => {
                      return (returnableObj.code.toLowerCase().indexOf($scope.searchString) !== -1);
                  });
                  if(element.children.site){
                    element.childrenVisibility = false;
                  }
              }
              if(element.children.organisation.length > 0){
                  element.children.organisation.forEach(function(childElement){
                      if(childElement.children.site){
                          childElement.children.site = childElement.children.site.filter(returnableObj => {
                              return (returnableObj.code.toLowerCase().indexOf($scope.searchString) !== -1);
                          });
                          if(childElement.children.site){
                            childElement.childrenVisibility = false;
                          }
                      }
                      if(childElement.children.organisation.length > 0){
                          childElement.children.organisation.forEach(lastChild => {
                              if(lastChild.children.site){
                                  lastChild.children.site = lastChild.children.site.filter(returnableObj => {
                                      return (returnableObj.code.toLowerCase().indexOf($scope.searchString) !== -1);
                                  });
                                  if(lastChild.children.site){
                                    lastChild.childrenVisibility = false;
                                  }
                              }
                          });
                      }
                  });
              }
          });
        }
      });
    });
  }
]);
