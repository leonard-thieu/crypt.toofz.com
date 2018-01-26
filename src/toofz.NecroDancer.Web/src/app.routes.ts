import * as leaderboardCategories from './modules/leaderboards/leaderboard-categories.json';

import each = require('lodash/each');
import reduce = require('lodash/reduce');
import * as util from './util';

import * as angular from 'angular';

import * as rootTemplate from './root.html';
import * as landingTemplate from './landing.html';
import * as _404Template from './404.html';

import { ToofzRestApi } from './modules/toofz-rest-api/toofz-rest-api';
import {
    StateProvider,
    Ng1StateDeclaration,
    StateParams,
    UrlMatcherFactory,
} from '@uirouter/angularjs';

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

        const rootState: Ng1StateDeclaration = {
            abstract: true,
            name: 'root',
            url: '',
            template: rootTemplate,
        };
        $stateProvider.state(rootState);

        const landingState: Ng1StateDeclaration = {
            name: 'root.landing',
            url: '/',
            template: landingTemplate,
        };
        $stateProvider.state(landingState);

        const itemsState: Ng1StateDeclaration = {
            name: 'root.items',
            url: '/items/{category}/{subcategory}?{page:int}',
            params: {
                category: null,
                subcategory: null,
                page: 1,
            },
            template: '<nd-items data="::$resolve.items"></nd-items>',
            resolve: {
                items: ($stateParams: StateParams,
                        toofzRestApi: ToofzRestApi) => {
                    'ngInject';
                    const { category, subcategory, page } = $stateParams;
                    const params = {
                        offset: util.pageToOffset(page, 10),
                    };

                    if (!category) {
                        return toofzRestApi.getItems(params);
                    }
                    if (!subcategory) {
                        return toofzRestApi.getItemsByCategory(category, params);
                    }
                    return toofzRestApi.getItemsBySubcategory(category, subcategory, params);
                },
            },
        };
        $stateProvider.state(itemsState);

        const enemiesState: Ng1StateDeclaration = {
            name: 'root.enemies',
            url: '/enemies/{attribute}?{page:int}',
            params: {
                attribute: null,
                page: 1,
            },
            template: '<nd-enemies data="::$resolve.enemies"></nd-enemies>',
            resolve: {
                enemies: ($stateParams: StateParams,
                          toofzRestApi: ToofzRestApi) => {
                    'ngInject';
                    let { attribute, page } = $stateParams;

                    if (attribute) { attribute = attribute.toLowerCase(); }

                    switch (attribute) {
                        case 'phasing':
                            attribute = 'ignore-walls';
                            break;
                    }

                    const params = {
                        offset: util.pageToOffset(page, 10),
                    };

                    if (!attribute) {
                        return toofzRestApi.getEnemies(params);
                    }
                    return toofzRestApi.getEnemiesByAttribute(attribute, params);
                },
            },
        };
        $stateProvider.state(enemiesState);

        const leaderboardsState: Ng1StateDeclaration = {
            name: 'root.leaderboards',
            url: '/leaderboards',
            template: '<nd-leaderboards categories="::$resolve.categories" leaderboards="::$resolve.leaderboards"></nd-leaderboards>',
            params: {
                categories: null,
            },
            resolve: {
                categories: ($stateParams: StateParams) => {
                    'ngInject';
                    const { categories } = $stateParams;

                    if (categories) {
                        return categories;
                    }

                    return leaderboardCategories;
                },
                leaderboards: (categories: toofzSite.Leaderboard.Categories,
                               toofzRestApi: ToofzRestApi,
                               $q: angular.IQService) => {
                    'ngInject';
                    const params: any = {
                        production: true,
                        coOp: false,
                        customMusic: false,
                    };

                    each(categories, (category, name) => {
                        params[name!] = reduce(category, (result, value, key) => {
                            if (value.value) {
                                result.push(key);
                            }

                            return result;
                        }, [] as string[]);
                    });

                    if (params.products.length &&
                        params.modes.length &&
                        params.runs.length &&
                        params.characters.length) {
                        return toofzRestApi.getLeaderboards(params).then(data => data.leaderboards);
                    } else {
                        return $q.resolve([]);
                    }
                },
            },
        };
        $stateProvider.state(leaderboardsState);

        const products = ['amplified', 'classic'].join('|');
        const characters = ['all', 'all-characters', 'all-characters-amplified', 'aria', 'bard', 'bolt', 'cadence', 'coda',
            'diamond', 'dorian', 'dove', 'eli', 'mary', 'melody', 'monk', 'nocturna', 'story', 'story-mode', 'tempo'].join('|');
        const runs = ['score', 'speed', 'seededscore', 'seeded-score', 'seededspeed', 'seeded-speed', 'deathless'].join('|');
        const modes = ['standard', 'no-return', 'hard-mode', 'hard', 'phasing', 'randomizer', 'mystery'].join('|');

        const leaderboardState: Ng1StateDeclaration = {
            name: 'root.leaderboard',
            url: `/leaderboards/{product:${products}}/{character:${characters}}/{run:${runs}}/{mode:${modes}}?{page:int}&{id}`,
            template: '<nd-leaderboard data="::$resolve.entries" player-entry="::$resolve.player"></nd-leaderboard>',
            params: {
                product: 'classic',
                mode: 'standard',
            },
            resolve: {
                leaderboard: ($stateParams: StateParams,
                              toofzRestApi: ToofzRestApi) => {
                    'ngInject';
                    let { product, mode, run, character } = $stateParams;

                    product = product.toLowerCase();
                    mode = mode.toLowerCase();
                    run = run.toLowerCase();
                    character = character.toLowerCase();

                    switch (mode) {
                        case 'hard-mode':
                            mode = 'hard';
                            break;
                    }

                    switch (run) {
                        case 'seededscore':
                            run = 'seeded-score';
                            break;
                        case 'seededspeed':
                            run = 'seeded-speed';
                            break;
                    }

                    switch (character) {
                        case 'all':
                            character = 'all-characters';
                            break;
                        case 'story':
                            character = 'story-mode';
                            break;
                    }

                    return toofzRestApi.getLeaderboards({
                        products: [product],
                        modes: [mode],
                        runs: [run],
                        characters: [character],
                        production: true,
                        coOp: false,
                        customMusic: false,
                    }).then(leaderboardsEnvelope => {
                        const leaderboard = leaderboardsEnvelope.leaderboards[0];
                        if (!leaderboard) {
                            // TODO: Can this redirect instead?
                            throw new Error(`Leaderboard could not be found for parameters: ${JSON.stringify($stateParams)}.`);
                        }

                        return leaderboard;
                    });
                },
                // This resolve is optional. If an entry can't be found, just display leaderboard entries without highlighting a player.
                player: ($stateParams: StateParams,
                         leaderboard: toofz.Leaderboard,
                         toofzRestApi: ToofzRestApi) => {
                    'ngInject';
                    const { id } = $stateParams;

                    if (!id) {
                        return undefined;
                    }

                    return toofzRestApi.getPlayerEntry(id, leaderboard.id)
                        .catch(() => { });
                },
                entries: ($stateParams: StateParams,
                          leaderboard: toofz.Leaderboard,
                          player: toofz.Entry,
                          toofzRestApi: ToofzRestApi) => {
                    'ngInject';
                    const { page } = $stateParams;

                    let offset: number;
                    if (!page && player) {
                        offset = util.roundDownToMultiple(player.rank - 1, 20);
                    } else {
                        offset = util.pageToOffset(page, 20)!;
                    }
                    const params = {
                        offset,
                    };

                    return toofzRestApi.getLeaderboardEntries(leaderboard.id, params);
                },
            },
        };
        $stateProvider.state(leaderboardState);

        const dailyLeaderboardState: Ng1StateDeclaration = {
            name: 'root.daily-leaderboard',
            url: `/leaderboards/{product:${products}}/daily?{date}&{production:bool}&{page:int}&{id}`,
            template: '<nd-leaderboard data="::$resolve.entries" player-entry="::$resolve.player"></nd-leaderboard>',
            params: {
                product: 'classic',
                production: true,
            },
            resolve: {
                leaderboard: ($stateParams: StateParams,
                              toofzRestApi: ToofzRestApi) => {
                    'ngInject';
                    const { product, date, production } = $stateParams;

                    return toofzRestApi.getDailyLeaderboards({
                        products: [product],
                        date: date,
                        production: production,
                    }).then(data => {
                        if (data.leaderboards.length < 1) {
                            throw new Error('No daily leaderboards were returned from toofz API.');
                        }

                        return data.leaderboards[0];
                    });
                },
                // This resolve is optional. If an entry can't be found, just display leaderboard entries without highlighting a player.
                player: ($stateParams: StateParams,
                         leaderboard: toofz.DailyLeaderboard,
                         toofzRestApi: ToofzRestApi) => {
                    'ngInject';
                    const { id } = $stateParams;

                    if (!id) {
                        return undefined;
                    }

                    return toofzRestApi.getPlayerDailyEntry(id, leaderboard.id)
                        .catch(() => { });
                },
                entries: ($stateParams: StateParams,
                          leaderboard: toofz.DailyLeaderboard,
                          player: toofz.Entry,
                          toofzRestApi: ToofzRestApi) => {
                    'ngInject';
                    const { page } = $stateParams;

                    let offset: number;
                    if (!page && player) {
                        offset = util.roundDownToMultiple(player.rank - 1, 20);
                    } else {
                        offset = util.pageToOffset(page, 20)!;
                    }
                    const params = {
                        offset,
                    };

                    return toofzRestApi.getDailyLeaderboardEntries(leaderboard.id, params);
                },
            },
        };
        $stateProvider.state(dailyLeaderboardState);

        const profileState: Ng1StateDeclaration = {
            name: 'root.profile',
            url: '/p/{id}/{slug}',
            params: {
                slug: '-',
            },
            template: '<nd-profile></nd-profile>',
            redirectTo: 'root.profile.amplified',
        };
        $stateProvider.state(profileState);

        const profileClassicState: Ng1StateDeclaration = {
            name: 'root.profile.classic',
            url: '/classic',
            template: '<nd-profile-entries data="::$resolve.classic"></nd-profile-entries>',
            resolve: {
                classic: ($stateParams: StateParams,
                          toofzRestApi: ToofzRestApi) => {
                    'ngInject';
                    const { id } = $stateParams;

                    return toofzRestApi.getPlayerEntries(id, {
                        products: ['classic'],
                        production: true,
                        coOp: false,
                        customMusic: false,
                    });
                },
            },
        };
        $stateProvider.state(profileClassicState);

        const profileAmplifiedState: Ng1StateDeclaration = {
            name: 'root.profile.amplified',
            url: '/amplified',
            template: '<nd-profile-entries data="::$resolve.amplified"></nd-profile-entries>',
            resolve: {
                amplified: ($stateParams: StateParams,
                            toofzRestApi: ToofzRestApi) => {
                    'ngInject';
                    const { id } = $stateParams;

                    return toofzRestApi.getPlayerEntries(id, {
                        products: ['amplified'],
                        production: true,
                        coOp: false,
                        customMusic: false,
                    });
                },
            },
        };
        $stateProvider.state(profileAmplifiedState);

        const profileClassicDailiesState: Ng1StateDeclaration = {
            name: 'root.profile.classic-dailies',
            url: '/classic-dailies',
            template: '<nd-profile-daily-entries data="::$resolve.classic"></nd-profile-daily-entries>',
            resolve: {
                classic: ($stateParams: StateParams,
                          toofzRestApi: ToofzRestApi) => {
                    'ngInject';
                    const { id } = $stateParams;

                    return toofzRestApi.getPlayerDailyEntries(id, {
                        products: ['classic'],
                        production: true,
                    });
                },
            },
        };
        $stateProvider.state(profileClassicDailiesState);

        const profileAmplifiedDailiesState: Ng1StateDeclaration = {
            name: 'root.profile.amplified-dailies',
            url: '/amplified-dailies',
            template: '<nd-profile-daily-entries data="::$resolve.amplified"></nd-profile-daily-entries>',
            resolve: {
                amplified: ($stateParams: StateParams,
                            toofzRestApi: ToofzRestApi) => {
                    'ngInject';
                    const { id } = $stateParams;

                    return toofzRestApi.getPlayerDailyEntries(id, {
                        products: ['amplified'],
                        production: true,
                    });
                },
            },
        };
        $stateProvider.state(profileAmplifiedDailiesState);

        const otherwiseState: Ng1StateDeclaration = {
            name: 'root.otherwise',
            url: '*path',
            template: _404Template,
        };
        $stateProvider.state(otherwiseState);

        $locationProvider.html5Mode(true);
    });
