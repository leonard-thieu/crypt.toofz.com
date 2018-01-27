import * as itemsTemplate from './items.html';
import '../currency/currency.scss';

import * as angular from 'angular';
import uirouter from '@uirouter/angularjs';
import pageTitle from '../page-title/page-title.module';
import pagination from '../pagination/pagination.module';
import titlecase from '../titlecase/titlecase.module';

import { ItemsController } from './items-controller';

const moduleName = 'necrodancer.items';
export default moduleName;

angular
    .module(moduleName, [
        uirouter,
        pageTitle,
        pagination,
        titlecase,
    ])
    /**
     * @ngdoc directive
     * @name ndItems
     * @restrict E
     *
     * @param {expression} data
     */
    .component('ndItems', {
        template: itemsTemplate,
        controller: ItemsController,
        bindings: {
            data: '<',
        },
    });
