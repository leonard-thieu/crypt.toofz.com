import * as searchTemplate from './search.html';
import * as searchResultTemplate from './search-result.html';
import './search.scss';

import * as angular from 'angular';
import uirouter from '@uirouter/angularjs';
import slug from '../slug/slug.module';
import toofzRestApi from '../toofz-rest-api/toofz-rest-api.module';

import { SearchController } from './search-controller';

const moduleName = 'necrodancer.search';
export default moduleName;

angular
    .module(moduleName, [
        uirouter,
        slug,
        toofzRestApi,
    ])
    /**
     * @ngdoc directive
     * @name ndSearch
     * @restrict E
     */
    .component('ndSearch', {
        template: searchTemplate,
        controller: SearchController,
    })
    /**
     * @ngdoc directive
     * @name ndSearchResult
     * @restrict E
     *
     * @param {expression} text
     * @param {expression} item
     */
    .component('ndSearchResult', {
        template: searchResultTemplate,
        bindings: {
            text: '<',
            item: '<',
        },
    });
