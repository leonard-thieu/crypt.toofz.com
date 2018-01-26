import * as angular from 'angular';
import 'angular-mocks';

import profile from '../../../../src/modules/profile/profile.module';
import { ProfileEntriesController } from '../../../../src/modules/profile/profile-entries-controller';
import { getBackendDefinition } from '../../../shared';

describe('ProfileEntriesController', function() {
    let $componentController: angular.IComponentControllerService;

    beforeEach(function() {
        angular.mock.module(profile);

        angular.module(profile);

        inject((_$componentController_: any) => {
            $componentController = _$componentController_;
        });
    });

    describe('constructor', function() {
        it(`should return instance`, function() {
            const ctrl = $componentController('ndProfileEntries', {});

            ctrl.should.be.an.instanceof(ProfileEntriesController);
        });
    });

    describe('$onInit', function() {
        it(`should group entries by product, mode, and run`, function() {
            const data = getBackendDefinition('getPlayerEntries');
            data.should.be.an('object');
            const ctrl = $componentController('ndProfileEntries', {}, { data: data }) as ProfileEntriesController;

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
            const data = getBackendDefinition('getPlayerEntries');
            const ctrl = $componentController('ndProfileEntries', {}, { data: data }) as ProfileEntriesController;

            ctrl.$onInit();

            // TODO: Determine how to best write assertion.
        });
    });
});
