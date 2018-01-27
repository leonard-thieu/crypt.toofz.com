import '../characters/characters.scss';
import '../currency/currency.scss';
import './profile.scss';

import * as angular from 'angular';
import uirouter from '@uirouter/angularjs';
import entryFilters from '../entry-filters/entry-filters.module';
import ordinal from '../ordinal/ordinal.module';
import pageTitle from '../page-title/page-title.module';

import { template as profileTemplate } from './profile';
import { template as profileHeaderTemplate } from './profile-header';
import { template as profileFooterTemplate } from './profile-footer';
import {
    template as profileEntriesTemplate,
    controller as ProfileEntriesController,
} from './profile-entries';
import {
    template as profileDailyEntriesTemplate,
    controller as ProfileDailyEntriesController,
} from './profile-daily-entries';

const moduleName = 'necrodancer.profile';
export default moduleName;

angular
    .module(moduleName, [
        uirouter,
        entryFilters,
        ordinal,
        pageTitle,
    ])
    /**
     * @ngdoc directive
     * @name ndProfile
     * @restrict E
     */
    .component('ndProfile', {
        template: profileTemplate,
    })
    /**
     * @ngdoc directive
     * @name ndProfileHeader
     * @restrict E
     *
     * @param {expression} player
     */
    .component('ndProfileHeader', {
        template: profileHeaderTemplate,
        bindings: {
            player: '<',
        },
    })
    /**
     * @ngdoc directive
     * @name ndProfileFooter
     * @restrict E
     *
     * @param {expression} leaderboardsUpdatedAt
     * @param {expression} playerUpdatedAt
     */
    .component('ndProfileFooter', {
        template: profileFooterTemplate,
        bindings: {
            leaderboardsUpdatedAt: '<',
            playerUpdatedAt: '<',
        },
    })
    /**
     * @ngdoc directive
     * @name ndProfileEntries
     * @restrict E
     *
     * @param {expression} data
     */
    .component('ndProfileEntries', {
        template: profileEntriesTemplate,
        controller: ProfileEntriesController,
        bindings: {
            data: '<',
        },
    })
    /**
     * @ngdoc directive
     * @name ndProfileDailyEntries
     * @restrict E
     *
     * @param {expression} data
     */
    .component('ndProfileDailyEntries', {
        template: profileDailyEntriesTemplate,
        controller: ProfileDailyEntriesController,
        bindings: {
            data: '<',
        },
    });
