import * as util from '../../util';

import { StateParams } from '@uirouter/angularjs';

export abstract class PagingControllerBase<T extends toofz.PagedResults> {
    constructor(protected $stateParams: StateParams) {
        'ngInject';
    }

    protected abstract limit: number;

    readonly data: T;

    records: Pagination;

    $onInit() {
        const { page } = this.$stateParams;

        this.records = {
            offset: util.pageToOffset(page, this.limit),
            limit: this.limit,
            total: this.data.total,
        };
    }
}
