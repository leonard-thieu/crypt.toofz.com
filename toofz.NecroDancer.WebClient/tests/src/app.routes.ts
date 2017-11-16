import * as sinon from 'sinon';

import * as angular from 'angular';
import 'angular-mocks';

import '../../src/app.module';
import { ToofzRestApi } from '../../src/modules/toofz-rest-api/toofz-rest-api';
import { ToofzSiteApi } from '../../src/modules/toofz-site-api/toofz-site-api';
import { BackendDefinition } from '../shared';
import {
    Ng1ViewDeclaration,
    StateParams,
    StateService
} from '@uirouter/angularjs';
import { StateObject } from '@uirouter/core';

const toofzSite_definitions = require('./modules/toofz-site-api/toofz-site-api-definitions.json').definitions;

describe('necrodancer (Routes)', function() {
    // http://nikas.praninskas.com/angular/2014/09/27/unit-testing-ui-router-configuration/
    function mockTemplate<T>(templateRoute: string, template?: T) {
        $templateCache.put(templateRoute, template || templateRoute);
    }

    function goTo(url: string) {
        $location.url(url);
        $rootScope.$digest();
    }

    function goFrom(url: string) {
        return {
            toState: function(state: string, params?: any) {
                $location.replace().url(url); // Don't actually trigger a reload
                $state.go(state, params);
                $rootScope.$digest();
            },
        };
    }

    function resolve(value: string) {
        return {
            forStateAndView: function(state: string, view?: string, locals?: any) {
                const viewDefinition: any = view ?
                    $state.get(state).views![view] :
                    $state.get(state);

                return $injector.invoke(viewDefinition.resolve![value], undefined, locals);
            },
            forState: function(this: any, state: string, locals?: any) {
                return this.forStateAndView(state, undefined, locals);
            },
        };
    }

    let $templateCache: angular.ITemplateCacheService;
    let $location: angular.ILocationService;
    let $state: StateService;
    let $rootScope: angular.IRootScopeService;
    let $injector: angular.auto.IInjectorService;
    let $stateParams: StateParams;
    let toofzSiteApi: ToofzSiteApi;
    let toofzRestApi: ToofzRestApi;

    beforeEach(function() {
        angular.mock.module('necrodancer.app');

        inject((_$templateCache_: any,
                _$location_: any,
                _$state_: any,
                _$rootScope_: any,
                _$injector_: any,
                _$stateParams_: any,
                _toofzSiteApi_: any,
                _toofzRestApi_: any) => {
            $templateCache = _$templateCache_;
            $location = _$location_;
            $state = _$state_;
            $rootScope = _$rootScope_;
            $injector = _$injector_;
            $stateParams = _$stateParams_;
            toofzSiteApi = _toofzSiteApi_;
            toofzRestApi = _toofzRestApi_;
        });
    });

    describe('root', function() {
        const state = 'root';

        describe('url', function() {
            it(`should return ''`, function() {
                const url = $state.href(state, {});

                url.should.equal('');
            });
        });

        describe('resolve', function() {
            let toofzSiteApi_getAreas: sinon.SinonStub;

            beforeEach(function() {
                toofzSiteApi_getAreas = sinon.stub(toofzSiteApi, 'getAreas');
            });

            it(`should call 'toofzSiteApi.getAreas()'`, function() {
                toofzSiteApi_getAreas.returns(Promise.resolve({ data: {} }));

                return resolve('areas').forState(state).should.be.fulfilled;
            });
        });
    });

    describe('root.landing', function() {
        const state = 'root.landing';

        describe('url', function() {
            it(`should return '/'`, function() {
                const url = $state.href(state, {});

                url.should.equal('/');
            });
        });
    });

    describe('root.items', function() {
        const state = 'root.items';

        describe('url', function() {
            it(`should return '/items' if no params supplied`, function() {
                const url = $state.href(state, {});

                url.should.equal('/items');
            });

            it(`should return '/items/{category}' if 'category' is defined`, function() {
                const url = $state.href(state, { category: 'weapons' });

                url.should.equal('/items/weapons');
            });

            it(`should return '/items/{category}/{subcategory}' if 'subcategory' is defined`, function() {
                const url = $state.href(state, { category: 'weapons', subcategory: 'bows' });

                url.should.equal('/items/weapons/bows');
            });

            it(`should return '/items?page={page}' if 'page' is defined`, function() {
                const url = $state.href(state, { page: 2 });

                url.should.equal('/items?page=2');
            });
        });

        describe('resolve', function() {
            describe('items', function() {
                let toofzRestApi_getItems: sinon.SinonStub;
                let toofzRestApi_getItemsByCategory: sinon.SinonStub;
                let toofzRestApi_getItemsBySubcategory: sinon.SinonStub;

                beforeEach(function() {
                    toofzRestApi_getItems = sinon.stub(toofzRestApi, 'getItems');
                    toofzRestApi_getItemsByCategory = sinon.stub(toofzRestApi, 'getItemsByCategory');
                    toofzRestApi_getItemsBySubcategory = sinon.stub(toofzRestApi, 'getItemsBySubcategory');
                });

                it(`should call 'toofzRestApi.getItems()' if 'category' is not defined`, function() {
                    toofzRestApi_getItems.returns(Promise.resolve());

                    const items = resolve('items').forState(state).should.be.fulfilled;
                    toofzRestApi_getItems.should.have.been.called;

                    return items;
                });

                it(`should call 'toofzRestApi.getItemsByCategory()' if 'category' is defined and 'subcategory' is not defined`, function() {
                    $stateParams.category = 'weapons';

                    toofzRestApi_getItemsByCategory.returns(Promise.resolve());

                    const items = resolve('items').forState(state).should.be.fulfilled;
                    toofzRestApi_getItemsByCategory.should.have.been.called;

                    return items;
                });

                it(`should call 'toofzRestApi.getItemsBySubcategory()' if 'category' is defined and 'subcategory' is defined`, function() {
                    $stateParams.category = 'weapons';
                    $stateParams.subcategory = 'bows';

                    toofzRestApi_getItemsBySubcategory.returns(Promise.resolve());

                    const items = resolve('items').forState(state).should.be.fulfilled;
                    toofzRestApi_getItemsBySubcategory.should.have.been.called;

                    return items;
                });
            });
        });
    });

    describe('root.enemies', function() {
        const state = 'root.enemies';

        describe('url', function() {
            it(`should return '/enemies' if no params supplied`, function() {
                const url = $state.href(state, {});

                url.should.equal('/enemies');
            });

            it(`should return '/enemies?page={page}' if page is defined`, function() {
                const url = $state.href(state, { page: 2 });

                url.should.equal('/enemies?page=2');
            });

            it(`should return '/enemies/{attribute}' if 'attribute' is defined`, function() {
                const url = $state.href(state, { attribute: 'floating' });

                url.should.equal('/enemies/floating');
            });
        });

        describe('resolve', function() {
            describe('enemies', function() {
                let toofzRestApi_getEnemies: sinon.SinonStub;
                let toofzRestApi_getEnemiesByAttribute: sinon.SinonStub;

                beforeEach(function() {
                    toofzRestApi_getEnemies = sinon.stub(toofzRestApi, 'getEnemies');
                    toofzRestApi_getEnemiesByAttribute = sinon.stub(toofzRestApi, 'getEnemiesByAttribute');
                });

                it(`should call 'toofzRestApi.getEnemies()' if 'attribute' is not defined`, function() {
                    toofzRestApi_getEnemies.returns(Promise.resolve());

                    const enemies = resolve('enemies').forState(state).should.be.fulfilled;
                    toofzRestApi_getEnemies.should.have.been.called;

                    return enemies;
                });

                it(`should call 'toofzRestApi.getEnemiesByAttribute()' if 'attribute' is defined`, function() {
                    $stateParams.attribute = 'floating';
                    toofzRestApi_getEnemiesByAttribute.returns(Promise.resolve());

                    const enemies = resolve('enemies').forState(state).should.be.fulfilled;
                    toofzRestApi_getEnemiesByAttribute.should.have.been.called;

                    return enemies;
                });
            });
        });
    });

    describe('root.leaderboards', function() {
        const state = 'root.leaderboards';

        describe('url', function() {
            it(`should return '/leaderboards'`, function() {
                const url = $state.href(state, {});

                url.should.equal('/leaderboards');
            });
        });

        describe('resolve', function() {
            describe('categories', function() {
                let toofzSiteApi_getLeaderboardCategories: sinon.SinonStub;

                beforeEach(function() {
                    toofzSiteApi_getLeaderboardCategories = sinon.stub(toofzSiteApi, 'getLeaderboardCategories');
                });

                it(`should return '$stateParams.categories' if it exists`, function() {
                    $stateParams.categories = {};

                    return resolve('categories').forState(state).should.equal($stateParams.categories);
                });

                it(`should return a default categories object if '$stateParams.categories' doesn't exist`, function() {
                    const categories = toofzSite_definitions.find((value: BackendDefinition) => value.description === 'getLeaderboardCategories');
                    toofzSiteApi_getLeaderboardCategories.returns(Promise.resolve(categories.response));

                    return resolve('categories').forState(state).should.eventually.be.an('object');
                });
            });

            describe('leaderboards', function() {
                let toofzRestApi_getLeaderboards: sinon.SinonStub;

                beforeEach(function() {
                    toofzRestApi_getLeaderboards = sinon.stub(toofzRestApi, 'getLeaderboards');
                });

                it(`should resolve data`, function() {
                    const categories = toofzSite_definitions.find((value: BackendDefinition) => value.description === 'getLeaderboardCategories');
                    toofzRestApi_getLeaderboards.returns(Promise.resolve({
                        leaderboards: [],
                    }));

                    return resolve('leaderboards').forState(state, {
                        categories: categories.response.data.categories,
                    }).should.eventually.be.an('array');
                });
            });
        });
    });

    describe('root.leaderboard', function() {
        const state = 'root.leaderboard';

        describe('url', function() {
            const characters = ['all', 'all-characters', 'all-characters-amplified', 'aria', 'bard', 'bolt', 'cadence', 'coda',
                'diamond', 'dorian', 'dove', 'eli', 'mary', 'melody', 'monk', 'nocturna', 'story', 'story-mode', 'tempo'];
            const runs = ['score', 'speed', 'seededscore', 'seeded-score', 'seededspeed', 'seeded-speed', 'deathless'];
            const modes = ['standard', 'no-return', 'hard-mode', 'hard', 'phasing', 'randomizer', 'mystery'];

            // Classic
            for (let i = 0; i < characters.length; i++) {
                const character = characters[i];
                for (let j = 0; j < runs.length; j++) {
                    const run = runs[j];
                    it(`should return '/leaderboards/${character}/${run}'`, function() {
                        const url = $state.href(state, {
                            character: character,
                            run: run,
                        });

                        url.should.equal(`/leaderboards/${character}/${run}`);
                    });
                }
            }

            // Amplified
            for (let i = 0; i < characters.length; i++) {
                const character = characters[i];
                for (let j = 0; j < runs.length; j++) {
                    const run = runs[j];
                    for (let k = 0; k < modes.length; k++) {
                        const mode = modes[k];
                        switch (mode) {
                            case 'standard':
                                it(`should return '/leaderboards/amplified/${character}/${run}'`, function() {
                                    const url = $state.href(state, {
                                        product: 'amplified',
                                        character: character,
                                        run: run,
                                        mode: mode,
                                    });

                                    url.should.equal(`/leaderboards/amplified/${character}/${run}`);
                                });
                                break;
                            default:
                                it(`should return '/leaderboards/amplified/${character}/${run}/${mode}'`, function() {
                                    const url = $state.href(state, {
                                        product: 'amplified',
                                        character: character,
                                        run: run,
                                        mode: mode,
                                    });

                                    url.should.equal(`/leaderboards/amplified/${character}/${run}/${mode}`);
                                });
                                break;
                        }
                    }
                }
            }
        });

        describe('resolve', function() {
            const leaderboard = {
                id: 1,
                product: 'amplified',
                mode: 'standard',
                run: 'speed',
                character: 'cadence',
            };

            describe('leaderboard', function() {
                let toofzRestApi_getLeaderboards: sinon.SinonStub;

                beforeEach(function() {
                    toofzRestApi_getLeaderboards = sinon.stub(toofzRestApi, 'getLeaderboards');
                    $stateParams.product = 'amplified';
                    $stateParams.mode = 'standard';
                    $stateParams.run = 'speed';
                    $stateParams.character = 'cadence';
                });

                it(`should resolve data`, function() {
                    toofzRestApi_getLeaderboards.returns(Promise.resolve({
                        total: 1,
                        leaderboards: [leaderboard],
                    }));

                    return resolve('leaderboard').forState(state).should.be.fulfilled;
                });
            });

            describe('player', function() {
                let toofzRestApi_getPlayerEntry: sinon.SinonStub;

                beforeEach(function() {
                    toofzRestApi_getPlayerEntry = sinon.stub(toofzRestApi, 'getPlayerEntry');
                });

                it(`should return undefined if 'id' doesn't exist`, function() {
                    const player = resolve('player').forState(state, { leaderboard: leaderboard });

                    should.not.exist(player);
                });

                it(`should return an 'Entry' object if 'id' exists`, function() {
                    $stateParams.id = '76561197960481221';
                    toofzRestApi_getPlayerEntry.returns(Promise.resolve({}));

                    const player = resolve('player').forState(state, { leaderboard: leaderboard });

                    return player.should.be.fulfilled;
                });

                it(`should return undefined if an entry for the player could not be found`, function() {
                    $stateParams.id = '76561197960481221';
                    toofzRestApi_getPlayerEntry.returns(Promise.reject({}));

                    const player = resolve('player').forState(state, { leaderboard: leaderboard });

                    return player.should.eventually.not.exist;
                });
            });

            describe('entries', function() {
                let toofzRestApi_getLeaderboardEntries: sinon.SinonStub;

                beforeEach(function() {
                    toofzRestApi_getLeaderboardEntries = sinon.stub(toofzRestApi, 'getLeaderboardEntries');
                });

                it(`should resolve data`, function() {
                    const player = undefined;
                    toofzRestApi_getLeaderboardEntries.returns(Promise.resolve({}));

                    return resolve('entries').forState(state, {
                        leaderboard: leaderboard,
                        player: player,
                    }).should.eventually.be.fulfilled;
                });
            });
        });
    });

    describe('root.daily-leaderboard', function() {
        const state = 'root.daily-leaderboard';

        describe('url', function() {

        });

        describe('resolve', function() {
            const leaderboard: toofz.DailyLeaderboard = {
                id: 1,
                updated_at: '',
                name: '',
                display_name: '',
                production: true,
                product: 'amplified',
                _product: {
                    id: 1,
                    name: 'amplified',
                    display_name: 'Amplified',
                },
                total: 1,
                date: '',
            };

            describe('leaderboard', function() {
                let toofzRestApi_getLeaderboards: sinon.SinonStub;

                beforeEach(function() {
                    toofzRestApi_getLeaderboards = sinon.stub(toofzRestApi, 'getDailyLeaderboards');
                    $stateParams.product = 'amplified';
                    $stateParams.production = true;
                });

                it(`should return leaderboard`, function() {
                    toofzRestApi_getLeaderboards.returns(Promise.resolve({
                        total: 1,
                        leaderboards: [leaderboard],
                    }));

                    return resolve('leaderboard').forState(state).should.be.fulfilled;
                });
            });

            describe('player', function() {
                let toofzRestApi_getPlayerDailyEntry: sinon.SinonStub;

                beforeEach(function() {
                    toofzRestApi_getPlayerDailyEntry = sinon.stub(toofzRestApi, 'getPlayerDailyEntry');
                });

                it(`should return undefined if 'id' doesn't exist`, function() {
                    const player = resolve('player').forState(state, { leaderboard: leaderboard });

                    should.not.exist(player);
                });

                it(`should return an 'DailyEntry' object if 'id' exists`, function() {
                    $stateParams.id = '76561197960481221';
                    toofzRestApi_getPlayerDailyEntry.returns(Promise.resolve({}));

                    const player = resolve('player').forState(state, { leaderboard: leaderboard });

                    return player.should.be.fulfilled;
                });

                it(`should return undefined if an entry for the player could not be found`, function() {
                    $stateParams.id = '76561197960481221';
                    toofzRestApi_getPlayerDailyEntry.returns(Promise.reject({}));

                    const player = resolve('player').forState(state, { leaderboard: leaderboard });

                    return player.should.eventually.not.exist;
                });
            });

            describe('entries', function() {
                let toofzRestApi_getDailyLeaderboardEntries: sinon.SinonStub;

                beforeEach(function() {
                    toofzRestApi_getDailyLeaderboardEntries = sinon.stub(toofzRestApi, 'getDailyLeaderboardEntries');
                });

                it(`should resolve data`, function() {
                    const player = undefined;
                    toofzRestApi_getDailyLeaderboardEntries.returns(Promise.resolve({}));

                    return resolve('entries').forState(state, {
                        leaderboard: leaderboard,
                        player: player,
                    }).should.eventually.be.fulfilled;
                });
            });
        });
    });

    describe('root.player', function() {
        const state = 'root.player';

        describe('url', function() {
            it(`should return '/p/{id}' if 'slug' is not defined`, function() {
                const url = $state.href(state, { id: '76561197960481221' });

                url.should.equal('/p/76561197960481221');
            });

            it(`should return '/p/{id}/{slug}' if 'slug' is defined`, function() {
                const url = $state.href(state, { id: '76561197960481221', slug: 'Mendayen' });

                url.should.equal('/p/76561197960481221/Mendayen');
            });
        });
    });

    describe('root.player.classic', function() {
        const state = 'root.player.classic';

        describe('url', function() {

        });

        describe('resolve', function() {
            describe('classic', function() {
                let toofzRestApi_getPlayerEntries: sinon.SinonStub;

                beforeEach(function() {
                    toofzRestApi_getPlayerEntries = sinon.stub(toofzRestApi, 'getPlayerEntries');
                });

                it(`should return player's Classic entries`, function() {
                    $stateParams.id = '76561197960481221';
                    toofzRestApi_getPlayerEntries.returns(Promise.resolve({}));

                    return resolve('classic').forState(state).should.eventually.be.fulfilled;
                });
            });
        });
    });

    describe('root.player.amplified', function() {
        const state = 'root.player.amplified';

        describe('url', function() {

        });

        describe('resolve', function() {
            describe('amplified', function() {
                let toofzRestApi_getPlayerEntries: sinon.SinonStub;

                beforeEach(function() {
                    toofzRestApi_getPlayerEntries = sinon.stub(toofzRestApi, 'getPlayerEntries');
                });

                it(`should return player's Amplified entries`, function() {
                    $stateParams.id = '76561197960481221';
                    toofzRestApi_getPlayerEntries.returns(Promise.resolve({}));

                    return resolve('amplified').forState(state).should.eventually.be.fulfilled;
                });
            });
        });
    });

    describe('root.player.classic-dailies', function() {
        const state = 'root.player.classic-dailies';

        describe('url', function() {

        });

        describe('resolve', function() {
            describe('classic', function() {
                let toofzRestApi_getPlayerDailyEntries: sinon.SinonStub;

                beforeEach(function() {
                    toofzRestApi_getPlayerDailyEntries = sinon.stub(toofzRestApi, 'getPlayerDailyEntries');
                });

                it(`should return player's Classic daily entries`, function() {
                    $stateParams.id = '76561197960481221';
                    toofzRestApi_getPlayerDailyEntries.returns(Promise.resolve({}));

                    return resolve('classic').forState(state).should.eventually.be.fulfilled;
                });
            });
        });
    });

    describe('root.player.amplified-dailies', function() {
        const state = 'root.player.amplified-dailies';

        describe('url', function() {

        });

        describe('resolve', function() {
            describe('amplified', function() {
                let toofzRestApi_getPlayerDailyEntries: sinon.SinonStub;

                beforeEach(function() {
                    toofzRestApi_getPlayerDailyEntries = sinon.stub(toofzRestApi, 'getPlayerDailyEntries');
                });

                it(`should return player's Amplified daily entries`, function() {
                    $stateParams.id = '76561197960481221';
                    toofzRestApi_getPlayerDailyEntries.returns(Promise.resolve({}));

                    return resolve('amplified').forState(state).should.eventually.be.fulfilled;
                });
            });
        });
    });
});
