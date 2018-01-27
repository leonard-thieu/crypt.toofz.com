import {
    Ng1StateDeclaration,
    StateParams,
} from '@uirouter/angularjs';
import * as util from '../util';
import { ToofzRestApi } from '../toofz-rest-api/toofz-rest-api';

export const enemiesState: Ng1StateDeclaration = {
    name: 'root.enemies',
    url: '/enemies/{attribute}?{page:int}',
    params: {
        attribute: null,
        page: 1,
    },
    template: '<nd-enemies data="::$resolve.enemies"></nd-enemies>',
    resolve: {
        enemies: ($stateParams: StateParams,
                  toofzRestApi: ToofzRestApi) => {
            'ngInject';
            let { attribute, page } = $stateParams;

            if (attribute) { attribute = attribute.toLowerCase(); }

            switch (attribute) {
                case 'phasing':
                    attribute = 'ignore-walls';
                    break;
            }

            const params = {
                offset: util.pageToOffset(page, 10),
            };

            if (!attribute) {
                return toofzRestApi.getEnemies(params);
            }
            return toofzRestApi.getEnemiesByAttribute(attribute, params);
        },
    },
};
