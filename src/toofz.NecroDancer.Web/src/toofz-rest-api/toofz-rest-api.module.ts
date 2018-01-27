import * as angular from 'angular';

import { ToofzRestApi } from './toofz-rest-api';

const moduleName = 'toofz.rest-api';
export default moduleName;

angular
    .module(moduleName, [])
    .service('toofzRestApi', ToofzRestApi);
