import * as util from '../../util';

import { StateParams } from '@uirouter/angularjs';

export abstract class PagingControllerBase<T extends toofz.PagedResults> {
    constructor(protected $stateParams: StateParams) {
        'ngInject';
    }

    protected abstract limit: number;

    readonly data: T;

    records: {
        offset: number | undefined;
        limit: number;
        total: number;
    };

    $onInit() {
        const { page } = this.$stateParams;

        this.records = {
            offset: util.pageToOffset(page, this.limit),
            limit: this.limit,
            total: this.data.total
        };
    }

    $postLink() {
        if (typeof this.records.offset !== 'number') {
            this.records.offset = 0;
        }
    }
}