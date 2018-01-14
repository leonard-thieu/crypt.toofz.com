import * as _ from 'lodash';

import { PlayerEntriesControllerBase } from './player-entries-controller-base';
import { PageTitle } from '../page-title/page-title';

export class PlayerEntriesController extends PlayerEntriesControllerBase<toofz.PlayerEntries> {
    private static getGroupKey(entry: toofz.Entry) {
        const { production, _product, _mode, _run } = entry.leaderboard!;

        var tokens = [];
        if (_mode.name !== 'standard') {
            tokens.push(_mode.display_name);
        }
        tokens.push(_run.display_name);
        if (_product.name !== 'classic') {
            tokens.push(`(${_product.display_name})`);
        }
        if (!production) {
            tokens.push('(Early Access)');
        }

        return tokens.join(' ');
    }

    private static mapEntriesGroup(entries: toofz.Entry[], key: string | undefined): EntriesGroup {
        return {
            display_name: key!,
            entries: entries,
        };
    }

    constructor(pageTitle: PageTitle) {
        'ngInject';
        super(pageTitle);
    }

    groups: EntriesGroup[];

    $onInit() {
        super.$onInit();

        const grouped = _.groupBy(this.data.entries, PlayerEntriesController.getGroupKey);
        const entriesGroups = _.map(grouped, PlayerEntriesController.mapEntriesGroup);
        this.groups = _.sortBy(entriesGroups, [
            'leaderboard.mode.id',
            'leaderboard.run.id',
        ]);
    }
}

interface EntriesGroup {
    display_name: string;
    entries: toofz.Entry[];
}
