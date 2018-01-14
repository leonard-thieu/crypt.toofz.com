import * as angular from 'angular';
import '@uirouter/angularjs';
import '../slug/slug.module';
import '../toofz-rest-api/toofz-rest-api.module';

import { SearchController } from './search-controller';

/**
 * @ngdoc directive
 * @name ndSearch
 * @restrict E
 */
/**
 * @ngdoc directive
 * @name ndSearchResult
 * @restrict E
 *
 * @param {expression} text
 * @param {expression} item
 */

angular
    .module('necrodancer.search', [
        'ui.router',
        'necrodancer.slug',
        'toofz.rest-api'
    ])
    .component('ndSearch', {
        templateUrl: fingerprint.get(__dirname + '/search.html'),
        controller: SearchController
    })
    .component('ndSearchResult', {
        templateUrl: fingerprint.get(__dirname + '/search-result.html'),
        bindings: {
            text: '<',
            item: '<'
        }
    });