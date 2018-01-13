import { PlayerEntriesControllerBase } from './player-entries-controller-base';
import { PageTitle } from '../page-title/page-title';

export class PlayerDailyEntriesController extends PlayerEntriesControllerBase<toofz.PlayerDailyEntries> {
    constructor(pageTitle: PageTitle) {
        'ngInject';
        super(pageTitle);
    }
}
