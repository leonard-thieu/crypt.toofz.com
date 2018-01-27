import { ProfileEntriesControllerBase } from './profile-entries-controller-base';
import { PageTitle } from '../page-title/page-title';

export class ProfileDailyEntriesController extends ProfileEntriesControllerBase<toofz.PlayerDailyEntries> {
    constructor(pageTitle: PageTitle) {
        'ngInject';
        super(pageTitle);
    }
}
