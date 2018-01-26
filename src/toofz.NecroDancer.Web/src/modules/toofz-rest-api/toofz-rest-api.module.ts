import * as angular from 'angular';

import { ToofzInterceptorFactory } from './toofz-interceptor-factory';
import { ToofzRestApi } from './toofz-rest-api';

const moduleName = 'toofz.rest-api';
export default moduleName;

angular
    .module(moduleName, [])
    .config(($httpProvider: angular.IHttpProvider) => {
        'ngInject';
        $httpProvider.interceptors.push(ToofzInterceptorFactory);
    })
    .service('toofzRestApi', ToofzRestApi);
