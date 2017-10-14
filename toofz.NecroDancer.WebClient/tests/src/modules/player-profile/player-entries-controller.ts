import * as angular from 'angular';
import 'angular-mocks';

import '../../../../src/modules/player-profile/player-profile.module';
import { PlayerEntriesController } from '../../../../src/modules/player-profile/player-entries-controller';
import { BackendDefinition } from '../../../shared';

const toofz_definitions: BackendDefinition[] = require('../toofz-rest-api/toofz-rest-api.definitions.json').definitions;

describe('PlayerEntriesController', function() {
    let $componentController: angular.IComponentControllerService;

    beforeEach(function() {
        angular.mock.module('necrodancer.player-profile');

        angular.module('necrodancer.player-profile');

        inject((_$componentController_: any) => {
            $componentController = _$componentController_;
        });
    });

    describe('constructor', function() {
        it(`should return instance`, function() {
            const ctrl = $componentController('ndPlayerEntries', {});

            ctrl.should.be.an.instanceof(PlayerEntriesController);
        });
    });

    describe('$onInit', function() {
        it(`should group entries by product, mode, and run`, function() {
            const data = toofz_definitions.find(d => d.description === 'getPlayerEntries')!.response.data;
            const ctrl = $componentController('ndPlayerEntries', {}, { data: data }) as PlayerEntriesController;

            ctrl.$onInit();

            ctrl.groups.every(g => {
                var leaderboard = g.entries[0].leaderboard!;

                return g.entries.every(e => {
                    var l = e.leaderboard!;

                    return l._product.id === leaderboard._product.id &&
                        l._mode.id === leaderboard._mode.id &&
                        l._run.id === leaderboard._run.id;
                });
            }).should.be.true;
        });

        xit(`should sort entries by mode, then run`, function() {
            const data = toofz_definitions.find(d => d.description === 'getPlayerEntries')!.response.data;
            const ctrl = $componentController('ndPlayerEntries', {}, { data: data }) as PlayerEntriesController;

            ctrl.$onInit();

            // TODO: Determine how to best write assertion.
        });
    });
});