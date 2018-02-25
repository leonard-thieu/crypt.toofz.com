import * as leaderboardTemplate from './leaderboard.html';
import '../currency/currency.scss';

import * as angular from 'angular';
import uirouter, { UrlMatcherFactory } from '@uirouter/angularjs';
import pageTitle from '../page-title/page-title.module';
import entryFilters from '../entry-filters/entry-filters.module';
import pagination from '../pagination/pagination.module';
import titlecase from '../titlecase/titlecase.module';
import slug from '../slug/slug.module';

import { LeaderboardController } from './leaderboard-controller';
import {
    characterParamTypeDefinition,
    modeParamTypeDefinition,
    productParamTypeDefinition,
    runParamTypeDefinition,
} from './leaderboard.routes';

const moduleName = 'necrodancer.leaderboard';
export default moduleName;

angular
    .module(moduleName, [
        uirouter,
        pageTitle,
        entryFilters,
        pagination,
        titlecase,
        slug,
    ])
    /**
     * @ngdoc directive
     * @name ndLeaderboard
     * @restrict E
     *
     * @param {expression} playerEntry
     * @param {expression} data
     */
    .component('ndLeaderboard', {
        template: leaderboardTemplate,
        controller: LeaderboardController,
        bindings: {
            playerEntry: '<',
            data: '<',
        },
    })
    .config(($urlMatcherFactoryProvider: UrlMatcherFactory) => {
        'ngInject';
        $urlMatcherFactoryProvider.type('product', productParamTypeDefinition);
        $urlMatcherFactoryProvider.type('character', characterParamTypeDefinition);
        $urlMatcherFactoryProvider.type('run', runParamTypeDefinition);
        $urlMatcherFactoryProvider.type('mode', modeParamTypeDefinition);
    });
