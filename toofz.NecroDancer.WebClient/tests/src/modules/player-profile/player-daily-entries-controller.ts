import * as angular from 'angular';
import 'angular-mocks';

import '../../../../src/modules/player-profile/player-profile.module';
import { PlayerDailyEntriesController } from '../../../../src/modules/player-profile/player-daily-entries-controller';

describe('PlayerDailyEntriesController', function() {
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
            const ctrl = $componentController('ndPlayerDailyEntries', {});

            ctrl.should.be.an.instanceof(PlayerDailyEntriesController);
        });
    });
});