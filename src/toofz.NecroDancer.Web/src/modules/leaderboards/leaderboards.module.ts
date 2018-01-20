import * as leaderboardsTemplate from './leaderboards.html';
import '../../characters/characters.scss';
import './leaderboards.scss';

import * as angular from 'angular';
import uirouter from '@uirouter/angularjs';
import pageTitle from '../page-title/page-title.module';
import toofzRestApi from '../toofz-rest-api/toofz-rest-api.module';

import { LeaderboardsController } from './leaderboards-controller';

const moduleName = 'necrodancer.leaderboards';
export default moduleName;

angular
    .module(moduleName, [
        uirouter,
        pageTitle,
        toofzRestApi,
    ])
    /**
     * @ngdoc directive
     * @name ndLeaderboards
     * @restrict E
     *
     * @param {expression} categories
     * @param {expression} leaderboards
     */
    .component('ndLeaderboards', {
        template: leaderboardsTemplate,
        controller: LeaderboardsController,
        bindings: {
            categories: '<',
            leaderboards: '<',
        },
    });
