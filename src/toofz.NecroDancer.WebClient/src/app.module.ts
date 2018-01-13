import * as angular from 'angular';
import '@uirouter/angularjs';
import 'angular-loading-bar';
import './modules/enemies/enemies.module';
import './modules/items/items.module';
import './modules/leaderboard/leaderboard.module';
import './modules/leaderboards/leaderboards.module';
import './modules/navbar/navbar.module';
import './modules/player-profile/player-profile.module';
import './modules/search/search.module';
import './modules/toofz-rest-api/toofz-rest-api.module';
import './modules/toofz-site-api/toofz-site-api.module';

// ngdoc support
/**
 * @typedef {*} expression
 */

// ngStrictDi
/**
 * @ngdoc directive
 * @name ngStrictDi
 * @restrict A
 *
 * @param {boolean} ngStrictDi
 */

// ngSwitchWhenSeparator
/**
 * @ngdoc directive
 * @name ngSwitchWhenSeparator
 * @restrict A
 *
 * @param {string} ngSwitchWhenSeparator
 */

angular
    .module('necrodancer.app', [
        'ui.router',
        'angular-loading-bar',
        'necrodancer.enemies',
        'necrodancer.items',
        'necrodancer.leaderboard',
        'necrodancer.leaderboards',
        'necrodancer.navbar',
        'necrodancer.player-profile',
        'necrodancer.search',
        'toofz.rest-api',
        'toofz.site-api'
    ])
    .config(($httpProvider: angular.IHttpProvider) => {
        'ngInject';
        const loggingInterceptor = ($log: angular.ILogService) => {
            'ngInject';
            return {
                // TODO: Should display error to user
                // TODO: Consider retry logic
                requestError: (rejection: any) => {
                    $log.error(rejection);
                }
            };
        };
        $httpProvider.interceptors.push(loggingInterceptor as any);
    });

import './app.routes';
import './app.config';
