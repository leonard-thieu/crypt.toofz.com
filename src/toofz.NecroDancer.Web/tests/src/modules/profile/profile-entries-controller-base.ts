import * as angular from 'angular';
import 'angular-mocks';

import profile from '../../../../src/modules/profile/profile.module';
import { ProfileEntriesControllerBase } from '../../../../src/modules/profile/profile-entries-controller-base';
import { PageTitle } from '../../../../src/modules/page-title/page-title';

describe('ProfileEntriesControllerBase', function() {
    let ctrl: ProfileEntriesControllerBase<toofz.PlayerEntriesBase<toofz.EntryBase<toofz.LeaderboardBase>>>;
    let pageTitle: PageTitle;
    let $rootScope: angular.IRootScopeService;

    beforeEach(function() {
        angular.mock.module(profile);

        angular.module(profile)
            .service('ProfileEntriesControllerBase', ProfileEntriesControllerBase);

        inject((_ProfileEntriesControllerBase_: any,
                _$rootScope_: any,
                _pageTitle_: any) => {
            ctrl = _ProfileEntriesControllerBase_;
            $rootScope = _$rootScope_;
            pageTitle = _pageTitle_;
        });
    });

    describe('constructor', function() {
        class ProfileEntriesControllerBaseAdapter extends ProfileEntriesControllerBase<toofz.PlayerEntriesBase<toofz.EntryBase<toofz.LeaderboardBase>>> {}

        it(`should return instance`, function() {
            const c = new ProfileEntriesControllerBaseAdapter(pageTitle);

            c.should.be.an.instanceof(ProfileEntriesControllerBase);
        });
    });

    describe('$onInit', function() {
        it(`should set title to player's display name if it exists`, function() {
            ctrl.data = {
                player: {
                    id: '1',
                    display_name: 'myName',
                    updated_at: null,
                    avatar: null,
                },
                total: 0,
                entries: [],
            };

            ctrl.$onInit();

            $rootScope.title!.should.equal('myName');
        });

        it(`should set title to player's id if display name does not exist`, function() {
            ctrl.data = {
                player: {
                    id: '1',
                    display_name: null,
                    updated_at: null,
                    avatar: null,
                },
                total: 0,
                entries: [],
            };

            ctrl.$onInit();

            $rootScope.title!.should.equal('1');
        });

        it(`should set 'leaderboardsUpdatedAt' to least recent time that leaderboards were updated at if there are any entries`, function() {
            ctrl.data = {
                player: {
                    id: '1',
                    display_name: null,
                    updated_at: null,
                    avatar: null,
                },
                total: 3,
                entries: [{
                    leaderboard: {
                        id: 1,
                        updated_at: '2017-10-04T11:43:46.043Z',
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
                    },
                    rank: 1,
                    score: 1,
                    end: {
                        zone: 1,
                        level: 1,
                    },
                    killed_by: null,
                    version: null,
                }, {
                    leaderboard: {
                        id: 1,
                        updated_at: '2017-10-04T11:43:34.463Z',
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
                    },
                    rank: 1,
                    score: 1,
                    end: {
                        zone: 1,
                        level: 1,
                    },
                    killed_by: null,
                    version: null,
                }, {
                    leaderboard: {
                        id: 1,
                        updated_at: '2017-10-04T11:43:38.723Z',
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
                    },
                    rank: 1,
                    score: 1,
                    end: {
                        zone: 1,
                        level: 1,
                    },
                    killed_by: null,
                    version: null,
                }],
            };

            ctrl.$onInit();

            ctrl.leaderboardsUpdatedAt!.should.equal('2017-10-04T11:43:34.463Z');
        });

        it(`should set 'leaderboardsUpdatedAt' to undefined if there are no entries`, function() {
            ctrl.data = {
                player: {
                    id: '1',
                    display_name: null,
                    updated_at: null,
                    avatar: null,
                },
                total: 0,
                entries: [],
            };

            ctrl.$onInit();

            should.not.exist(ctrl.leaderboardsUpdatedAt);
        });
    });

    describe('$onDestroy', function() {
        it(`should unset title`, function() {
            ctrl.data = {
                player: {
                    id: '1',
                    display_name: null,
                    updated_at: null,
                    avatar: null,
                },
                total: 0,
                entries: [],
            };
            ctrl.$onInit();

            ctrl.$onDestroy();

            should.not.exist($rootScope.title);
        });
    });
});
