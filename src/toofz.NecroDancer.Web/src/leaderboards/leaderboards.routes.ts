import * as leaderboardCategories from './leaderboard-categories.json';

import {
    Ng1StateDeclaration,
    StateParams,
} from '@uirouter/angularjs';
import * as angular from 'angular';
import { ToofzRestApi } from '../toofz-rest-api/toofz-rest-api';
import each = require('lodash/each');
import reduce = require('lodash/reduce');

export const leaderboardsState: Ng1StateDeclaration = {
    name: 'root.leaderboards',
    url: '/leaderboards',
    template: '<nd-leaderboards categories="::$resolve.categories" leaderboards="::$resolve.leaderboards"></nd-leaderboards>',
    params: {
        categories: null,
    },
    resolve: {
        categories: ($stateParams: StateParams) => {
            'ngInject';
            const { categories } = $stateParams;

            if (categories) {
                return categories;
            }

            return leaderboardCategories;
        },
        leaderboards: (categories: toofzSite.Leaderboard.Categories,
                       toofzRestApi: ToofzRestApi,
                       $q: angular.IQService) => {
            'ngInject';
            const params: any = {
                production: true,
                coOp: false,
                customMusic: false,
            };

            each(categories, (category, name) => {
                params[name!] = reduce(category, (result, value, key) => {
                    if (value.value) {
                        result.push(key);
                    }

                    return result;
                }, [] as string[]);
            });

            if (params.products.length &&
                params.modes.length &&
                params.runs.length &&
                params.characters.length) {
                return toofzRestApi.getLeaderboards(params).then(data => data.leaderboards);
            } else {
                return $q.resolve([]);
            }
        },
    },
};
