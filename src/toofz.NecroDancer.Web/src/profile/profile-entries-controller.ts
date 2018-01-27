import groupBy = require('lodash/groupBy');
import map = require('lodash/map');
import sortBy = require('lodash/sortBy');

import { ProfileEntriesControllerBase } from './profile-entries-controller-base';
import { PageTitle } from '../page-title/page-title';

export class ProfileEntriesController extends ProfileEntriesControllerBase<toofz.PlayerEntries> {
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

        const grouped = groupBy(this.data.entries, ProfileEntriesController.getGroupKey);
        const entriesGroups = map(grouped, ProfileEntriesController.mapEntriesGroup);
        this.groups = sortBy(entriesGroups, [
            'leaderboard.mode.id',
            'leaderboard.run.id',
        ]);
    }
}

interface EntriesGroup {
    display_name: string;
    entries: toofz.Entry[];
}
