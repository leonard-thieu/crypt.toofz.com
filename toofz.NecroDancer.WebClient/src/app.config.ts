import * as angular from 'angular';

declare global {
    const options: Options;
    const fingerprint: {
        get(url: string): string;
    };
}

interface Options {
    apiBaseUrl: string;
    isDevelopment: boolean;
}

angular
    .module('necrodancer.app')
    .constant('apiBaseUrl', options.apiBaseUrl)
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
                error,
            });
        });
    });

if (!options.isDevelopment) {
    angular
        .module('necrodancer.app')
        .config(($compileProvider: angular.ICompileProvider) => {
            'ngInject';
            $compileProvider.debugInfoEnabled(false);
            $compileProvider.commentDirectivesEnabled(false);
            $compileProvider.cssClassDirectivesEnabled(false);
        });
}