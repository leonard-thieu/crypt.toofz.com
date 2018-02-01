/// <reference types="mocha" />

import * as angular from 'angular';
import 'angular-mocks';

import '../../../src/pagination/pagination.module';
import { PagingControllerBase } from '../../../src/pagination/paging-controller-base';

describe('PagingControllerBase', function() {
    let ctrl: PagingControllerBase<any>;
    let _ctrl: any;

    beforeEach(function() {
        angular.mock.module('necrodancer.pagination');

        angular.module('necrodancer.pagination')
            .service('pagingControllerBase', PagingControllerBase);

        inject((_pagingControllerBase_: any) => {
            ctrl = _pagingControllerBase_;
            _ctrl = ctrl;
        });
    });

    describe('$onInit', function() {
        it(`should initialize controller`, function() {
            _ctrl.data = {};

            ctrl.$onInit();

            ctrl.records.should.be.an('object');
        });
    });
});
