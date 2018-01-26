import * as enemiesTemplate from './enemies.html';
import '../../currency/currency.scss';

import * as angular from 'angular';
import uirouter from '@uirouter/angularjs';
import pageTitle from '../page-title/page-title.module';
import pagination from '../pagination/pagination.module';

import { EnemiesController } from './enemies-controller';

const moduleName = 'necrodancer.enemies';
export default moduleName;

angular
    .module(moduleName, [
        uirouter,
        pageTitle,
        pagination,
    ])
    /**
     * @ngdoc directive
     * @name ndEnemies
     * @restrict E
     *
     * @param {expression} data
     */
    .component('ndEnemies', {
        template: enemiesTemplate,
        controller: EnemiesController,
        bindings: {
            data: '<',
        },
    });
