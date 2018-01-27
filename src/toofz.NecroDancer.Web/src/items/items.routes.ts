import {
    Ng1StateDeclaration,
    StateParams,
} from '@uirouter/angularjs';
import * as util from '../util';
import { ToofzRestApi } from '../toofz-rest-api/toofz-rest-api';

export const itemsState: Ng1StateDeclaration = {
    name: 'root.items',
    url: '/items/{category}/{subcategory}?{page:int}',
    params: {
        category: null,
        subcategory: null,
        page: 1,
    },
    template: '<nd-items data="::$resolve.items"></nd-items>',
    resolve: {
        items: ($stateParams: StateParams,
                toofzRestApi: ToofzRestApi) => {
            'ngInject';
            const { category, subcategory, page } = $stateParams;
            const params = {
                offset: util.pageToOffset(page, 10),
            };

            if (!category) {
                return toofzRestApi.getItems(params);
            }
            if (!subcategory) {
                return toofzRestApi.getItemsByCategory(category, params);
            }
            return toofzRestApi.getItemsBySubcategory(category, subcategory, params);
        },
    },
};
