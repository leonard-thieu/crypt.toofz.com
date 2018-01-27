import * as notFoundTemplate from './not-found.html';

import { Ng1StateDeclaration } from '@uirouter/angularjs';

export const otherwiseState: Ng1StateDeclaration = {
    name: 'root.otherwise',
    url: '*path',
    template: notFoundTemplate,
};
