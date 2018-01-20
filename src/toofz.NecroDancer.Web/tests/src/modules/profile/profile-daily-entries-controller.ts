import * as angular from 'angular';
import 'angular-mocks';

import profile from '../../../../src/modules/profile/profile.module';
import { ProfileDailyEntriesController } from '../../../../src/modules/profile/profile-daily-entries-controller';

describe('ProfileDailyEntriesController', function() {
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
            const ctrl = $componentController('ndProfileDailyEntries', {});

            ctrl.should.be.an.instanceof(ProfileDailyEntriesController);
        });
    });
});
