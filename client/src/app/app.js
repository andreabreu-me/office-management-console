angular.module('app', [
    'ngSanitize',
    'ngResource',
    'ngAnimate',
    'ui.bootstrap',
    'ui.router',
    'ui.select',
    'growlNotifications',
    'ncy-angular-breadcrumb',
    'accounts',
    'resources.account',
    'services.i18nNotifications',
    'services.httpRequestTracker',
    'templates.app',
'templates.common']);

//TODO: move those messages to a separate module
angular.module('app').constant('I18N.MESSAGES', {
    'errors.route.changeError':'Route change error: {{rejection}}',
    'crud.account.create.success':"Account '{{account.uuid}} | {{account.name}}' successfully created.",
    'crud.account.create.error':"Failed to create account '{{account.name}}: ",
    'crud.account.update.success':"Account '{{account.uuid}} | {{account.name}}' successfully updated.",
    'crud.account.update.error':"Failed to update account '{{account.name}}: ",
    'crud.account.delete.success':"Account '{{account.uuid}} | {{account.name}}' successfully deleted.",
    'crud.account.delete.error':"Failed to delete account '{{account.uuid}} | {{account.name}}': ",
    'crud.configuration.save.success':"A configuration with id '{{id}}' was saved successfully.",
    'crud.configuration.remove.success':"A configuration with id '{{id}}' was removed successfully.",
    'crud.configuration.save.error':"Something went wrong when saving a configuration..."
});

angular.module('app').constant('BACKEND', {
    'host': 'http://localhost:8080'
});

angular.module('app').config(['$urlRouterProvider', 'uiSelectConfig', function ($urlRouterProvider, uiSelectConfig) {
    $urlRouterProvider.otherwise('/accounts');
    uiSelectConfig.theme = 'bootstrap';
}]);

angular.module('app').controller('AppCtrl', ['$scope', 'i18nNotifications', 'localizedMessages', function($scope, i18nNotifications, localizedMessages) {

    $scope.notifications = i18nNotifications;

    $scope.removeNotification = function (notification) {
        i18nNotifications.remove(notification);
    };

    $scope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
        i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: error});
    });

    $scope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) { 
        console.log('Wanted to change from state ' + angular.toJson(fromState) + ' to ' + angular.toJson(unfoundState) + ' but could not find it');
    });

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        console.log('Successfully changed from ' + angular.toJson(fromState) + ' to ' + angular.toJson(toState));
    });
}]);

angular.module('app').controller('HeaderCtrl', ['$scope', '$state', 'notifications', 'httpRequestTracker',
    function ($scope, $state, notifications, httpRequestTracker) {

        $scope.isNavbarActive = function (navBarState) {
            return $state.current.name === navBarState;
        };

        $scope.hasPendingRequests = function () {
            return httpRequestTracker.hasPendingRequests();
        };
    }
]);
