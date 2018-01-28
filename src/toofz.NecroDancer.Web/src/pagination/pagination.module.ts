import * as paginationTemplate from './pagination.html';
import './pagination.scss';

import * as angular from 'angular';
import uirouter from '@uirouter/angularjs';

import { PaginationController } from './pagination-controller';

const moduleName = 'necrodancer.pagination';
export default moduleName;

angular
    .module(moduleName, [
        uirouter,
    ])
    /**
     * @ngdoc directive
     * @name ndPagination
     * @restrict E
     *
     * @param {expression} data
     */
    .component('ndPagination', {
        template: paginationTemplate,
        controller: PaginationController,
        bindings: {
            data: '<',
        },
    });
