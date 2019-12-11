app.directive("nodeTree", function() {
  return {
    template: '<node ng-repeat="node in tree"></node>',
    replace: true,
    restrict: "E",
    scope: {
      tree: "=children"
    }
  };
});
app.directive("node", function($compile) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "templates/node.html",
    link: function(scope, element) {
      /*
            here we are checking that if current node has children then compiling/rendering children.
            */
      if (
        scope.node &&
        scope.node.children.site &&
        scope.node.children.site.length > 0
      ) {
        scope.node.childrenVisibility = true;
        let childNode = $compile(
          '<ul class="tree" ng-if="!node.childrenVisibility"><code-tree children="node.children.site"></code-tree></ul>'
        )(scope);
        element.append(childNode);
      } else {
        scope.node.childrenVisibility = false;
      }
      if (scope.node && scope.node.children.organisation.length > 0) {
        scope.node.childrenVisibility = true;
        scope.node.children.organisation.forEach(item => {
          if (item.children.site.length > 0) {
            scope.node.lastchildVisibility = true;
          }
        });

        let childNode = $compile(
          '<ul class="tree" ng-if="!node.childrenVisibility"><code-tree children="node.children.organisation"></code-tree></ul>'
        )(scope);
        element.append(childNode);
      }
    },
    controller: [
      "$scope",
      function($scope) {
        /*This function is for just toggle the visibility of children */
        $scope.toggleVisibility = function(node) {
          if (node.children) {
            node.childrenVisibility = !node.childrenVisibility;
          }
        };
        //Here we are marking check/un-check all the nodes.
        $scope.checkNode = function(node) {
          node.checked = !node.checked;
          console.log("OK");
          function checkChildren(c) {
            if (c.children.site) {
              angular.forEach(c.children.site, function(c) {
                c.checked = node.checked;
              });
            }
            if (c.children.organisation.length > 0) {
              angular.forEach(c.children.organisation, c => {
                c.checked = node.checked;
                if (c.children.site) {
                  c.children.site.forEach(element => {
                    element.checked = node.checked;
                  });
                }
                if (c.children.organisation.length > 0) {
                  c.children.organisation.forEach(c => {
                    c.checked = node.checked;
                    if (c.children.site) {
                      c.children.site.forEach(c => {
                        c.checked = node.checked;
                      });
                    }
                  });
                }
              });
            }
          }
          
          
          checkChildren(node);
         
          
        };
      }
    ]
  };
});
app.directive("codeTree", function() {
  return {
    template: '<code ng-repeat="node in tree"></code>',
    replace: true,
    restrict: "E",
    scope: {
      tree: "=children"
    }
  };
});
app.directive("code", function($compile) {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "templates/code.html",
    link: function(scope, element) {
      // here we are checking that if current node has children then compiling/rendering children.

      if (
        scope.node &&
        scope.node.children.site &&
        scope.node.children.site.length > 0
      ) {
        scope.node.childrenVisibility = true;
        let childNode = $compile(
          '<ul class="tree" ng-if="!node.childrenVisibility"><code-tree children="node.children.site"></code-tree></ul>'
        )(scope);
        element.append(childNode);
      } else {
        scope.node.childrenVisibility = false;
      }
      if (scope.node && scope.node.children.organisation.length > 0) {
        scope.node.childrenVisibility = true;

        let childNode = $compile(
          '<ul class="tree" ng-if="!node.childrenVisibility"><code-tree children="node.children.organisation"></code-tree></ul>'
        )(scope);
        element.append(childNode);
      }
    },
    controller: [
      "$scope",
      function($scope) {
        // This function is for just toggle the visibility of children
        $scope.toggleVisibility = function(node) {
          if (node.children) {
            node.childrenVisibility = !node.childrenVisibility;
          }
        };
        //Here we are marking check/un-check all the nodes.
        $scope.checkNode = function(node) {
          node.checked = !node.checked;
          console.log("ok");
          function checkChildren(c) {
            console.log('checking children');
            if (c.children.site) {
              angular.forEach(c.children.site, function(c) {
                c.checked = node.checked;
              });
            }
            if (c.children.organisation.length > 0) {
              angular.forEach(c.children.organisation, c => {
                c.checked = node.checked;
                if (c.children.site) {
                  c.children.site.forEach(element => {
                    element.checked = node.checked;
                  });
                }
                if (c.children.organisation.length > 0) {
                  c.children.organisation.forEach(c => {
                    c.checked = node.checked;
                    if (c.children.site) {
                      c.children.site.forEach(c => {
                        c.checked = node.checked;
                      });
                    }
                  });
                }
              });
            }
          }
          
          checkChildren(node);
          
        };
      }
    ]
  };
});
