import * as angular from 'angular';

declare const options: {
    apiBaseUrl: string;
    isDevelopment: boolean;
};

const opts: typeof options = {
    apiBaseUrl: 'http://localhost/',
    isDevelopment: true,
};
if (typeof options !== 'undefined') {
    $.extend(opts, options);
}

if (opts.apiBaseUrl.endsWith('/')) {
    opts.apiBaseUrl = opts.apiBaseUrl.slice(0, -1);
}

angular
    .module('necrodancer.app')
    .constant('apiBaseUrl', opts.apiBaseUrl)
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

if (!opts.isDevelopment) {
    angular
        .module('necrodancer.app')
        .config(($compileProvider: angular.ICompileProvider) => {
            'ngInject';
            $compileProvider.debugInfoEnabled(false);
            $compileProvider.commentDirectivesEnabled(false);
            $compileProvider.cssClassDirectivesEnabled(false);
        });
}