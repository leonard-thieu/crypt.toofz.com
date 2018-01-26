import * as angular from 'angular';
import titlecase from '../titlecase/titlecase.module';

import { PageTitle } from './page-title';

const moduleName = 'necrodancer.page-title';
export default moduleName;

angular
    .module(moduleName, [
        titlecase,
    ])
    .service('pageTitle', PageTitle);
