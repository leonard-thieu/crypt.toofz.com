import * as angular from 'angular';
import { TransitionService } from '@uirouter/angularjs';

declare global {
    const apiBaseUrl: string;
}

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
                error,
            });
        });
    })
    .run(($transitions: TransitionService) => {
        'ngInject';
        $transitions.onStart({}, () => {
            if (appInsights) {
                appInsights.startTrackPage();
            }
        });

        $transitions.onFinish({}, () => {
            if (appInsights) {
                appInsights.stopTrackPage();
            }
        });
    });
