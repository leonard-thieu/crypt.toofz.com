import * as angular from 'angular';
import {
    StateProvider,
    UrlMatcherFactory,
} from '@uirouter/angularjs';

import { enemiesState } from './enemies/enemies.routes';
import { itemsState } from './items/items.routes';
import { landingState } from './landing/landing.routes';
import {
    dailyLeaderboardState,
    leaderboardState,
} from './leaderboard/leaderboard.routes';
import { leaderboardsState } from './leaderboards/leaderboards.routes';
import { otherwiseState } from './otherwise/otherwise.routes';
import {
    profileAmplifiedDailiesState,
    profileAmplifiedState,
    profileClassicDailiesState,
    profileClassicState,
    profileState,
} from './profile/profile.routes';
import { rootState } from './root/root.routes';

angular
    .module('necrodancer.app')
    .config((apiBaseUrl: string,
             $locationProvider: angular.ILocationProvider,
             $stateProvider: StateProvider,
             $urlMatcherFactoryProvider: UrlMatcherFactory) => {
        'ngInject';
        $urlMatcherFactoryProvider.strictMode(false);
        $urlMatcherFactoryProvider.defaultSquashPolicy(true);
        $urlMatcherFactoryProvider.caseInsensitive(true);

        $stateProvider.state(rootState);
        $stateProvider.state(landingState);
        $stateProvider.state(itemsState);
        $stateProvider.state(enemiesState);
        $stateProvider.state(leaderboardsState);
        $stateProvider.state(leaderboardState);
        $stateProvider.state(dailyLeaderboardState);
        $stateProvider.state(profileState);
        $stateProvider.state(profileClassicState);
        $stateProvider.state(profileAmplifiedState);
        $stateProvider.state(profileClassicDailiesState);
        $stateProvider.state(profileAmplifiedDailiesState);
        $stateProvider.state(otherwiseState);

        $locationProvider.html5Mode(true);
    });
