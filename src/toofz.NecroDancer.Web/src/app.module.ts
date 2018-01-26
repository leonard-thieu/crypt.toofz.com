import '../css/site.scss';

import 'imports-loader?jQuery=jquery!bootstrap';
import * as angular from 'angular';
import uirouter from '@uirouter/angularjs';
import * as angularLoadingBar from 'angular-loading-bar';
import enemies from './modules/enemies/enemies.module';
import items from './modules/items/items.module';
import leaderboard from './modules/leaderboard/leaderboard.module';
import leaderboards from './modules/leaderboards/leaderboards.module';
import navbar from './modules/navbar/navbar.module';
import profile from './modules/profile/profile.module';
import search from './modules/search/search.module';
import toofzRestApi from './modules/toofz-rest-api/toofz-rest-api.module';

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
        uirouter,
        angularLoadingBar,
        enemies,
        items,
        leaderboard,
        leaderboards,
        navbar,
        profile,
        search,
        toofzRestApi,
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
                },
            };
        };
        $httpProvider.interceptors.push(loggingInterceptor as any);
    });

import './app.routes';
import './app.config';
