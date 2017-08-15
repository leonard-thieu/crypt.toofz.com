import * as angular from 'angular';

declare const apiBaseUrl: string;
declare const isDevelopment: boolean;

angular
    .module('necrodancer.app')
    .constant('apiBaseUrl', apiBaseUrl)
    .config((cfpLoadingBarProvider: angular.loadingBar.ILoadingBarProvider) => {
        'ngInject';
        cfpLoadingBarProvider.latencyThreshold = 0;
    })
    .run(($rootScope: angular.IRootScopeService,
          $log: angular.ILogService) => {
        'ngInject';
        $rootScope.$on('$stateChangeError', (event, fromState, fromParams, toState, toParams, error) => {
            $log.error({
                event,
                fromState,
                fromParams,
                toState,
                toParams,
                error
            });
        });
    });

if (!isDevelopment) {
    angular
        .module('necrodancer.app')
        .config(($compileProvider: angular.ICompileProvider) => {
            'ngInject';
            $compileProvider.debugInfoEnabled(false);
            $compileProvider.commentDirectivesEnabled(false);
            $compileProvider.cssClassDirectivesEnabled(false);
        });
}