import * as rootTemplate from './root.html';

import { Ng1StateDeclaration } from '@uirouter/angularjs';

export const rootState: Ng1StateDeclaration = {
    abstract: true,
    name: 'root',
    url: '',
    template: rootTemplate,
};
