import * as angular from 'angular';
import '../entry-filters/entry-filters.module';
import '../ordinal/ordinal.module';
import '../page-title/page-title.module';

import { PlayerEntriesController } from './player-entries-controller';
import { PlayerDailyEntriesController } from './player-daily-entries-controller';

/**
 * @ngdoc directive
 * @name ndPlayerProfileHeader
 * @restrict E
 *
 * @param {expression} player
 */
/**
 * @ngdoc directive
 * @name ndPlayerProfileFooter
 * @restrict E
 *
 * @param {expression} leaderboardsUpdatedAt
 * @param {expression} playerUpdatedAt
 */
/**
 * @ngdoc directive
 * @name ndPlayerEntries
 * @restrict E
 *
 * @param {expression} data
 */
/**
 * @ngdoc directive
 * @name ndPlayerDailyEntries
 * @restrict E
 *
 * @param {expression} data
 */

angular
    .module('necrodancer.player-profile', [
        'necrodancer.entry-filters',
        'necrodancer.ordinal',
        'necrodancer.page-title'
    ])
    .component('ndPlayerProfile', {
        templateUrl: __dirname + '/player-profile.html',
    })
    .component('ndPlayerProfileHeader', {
        templateUrl: __dirname + '/player-profile-header.html',
        bindings: {
            player: '<',
        }
    })
    .component('ndPlayerProfileFooter', {
        templateUrl: __dirname + '/player-profile-footer.html',
        bindings: {
            leaderboardsUpdatedAt: '<',
            playerUpdatedAt: '<',
        }
    })
    .component('ndPlayerEntries', {
        templateUrl: __dirname + '/player-entries.html?v=2',
        controller: PlayerEntriesController,
        bindings: {
            data: '<',
        }
    })
    .component('ndPlayerDailyEntries', {
        templateUrl: __dirname + '/player-daily-entries.html?v=2',
        controller: PlayerDailyEntriesController,
        bindings: {
            data: '<',
        }
    });