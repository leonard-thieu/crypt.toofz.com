import { PagingControllerBase } from '../pagination/paging-controller-base';
import { PageTitle } from '../page-title/page-title';
import { StateParams } from '@uirouter/angularjs';

export class ItemsController extends PagingControllerBase<toofz.Items> {
    constructor($stateParams: StateParams,
                private readonly pageTitle: PageTitle) {
        'ngInject';
        super($stateParams);

        const { category, subcategory } = $stateParams;

        if (category) {
            if (subcategory) {
                this.title = `${category} (${subcategory})`;
            } else {
                this.title = category;
            }
        }

        this.title = this.pageTitle.set(this.title);
    }

    limit = 10;
    title = 'Items';

    $onDestroy() {
        this.pageTitle.unset();
    }
}