import * as _ from 'lodash';
import { PageTitle } from '../page-title/page-title';

export abstract class PlayerEntriesControllerBase<T extends toofz.PlayerEntriesBase<toofz.EntryBase<toofz.LeaderboardBase>>> {
    constructor(private readonly pageTitle: PageTitle) {
        'ngInject';
    }

    data: T;

    leaderboardsUpdatedAt: string | undefined;

    $onInit() {
        this.setTitle();

        this.leaderboardsUpdatedAt = _.min(_.flatMap(this.data.entries, g => g.leaderboard!.updated_at));
    }

    $onDestroy() {
        this.pageTitle.unset();
    }

    private setTitle() {
        const { display_name, id } = this.data.player;

        this.pageTitle.set(display_name || id, false);
    }
}
