import * as angular from 'angular';
import '@uirouter/angularjs';

import { PaginationController } from './pagination-controller';

/**
 * @ngdoc directive
 * @name ndPagination
 * @restrict E
 *
 * @param {expression} data
 */

angular
    .module('necrodancer.pagination', [
        'ui.router'
    ])
    .component('ndPagination', {
        templateUrl: __dirname + '/pagination.html',
        controller: PaginationController,
        bindings: {
            data: '<'
        }
    });