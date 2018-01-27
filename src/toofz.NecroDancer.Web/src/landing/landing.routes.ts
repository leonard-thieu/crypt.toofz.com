import * as landingTemplate from './landing.html';

import { Ng1StateDeclaration } from '@uirouter/angularjs';

export const landingState: Ng1StateDeclaration = {
    name: 'root.landing',
    url: '/',
    template: landingTemplate,
};
