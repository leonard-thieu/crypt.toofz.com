import * as areas from './areas.json';

export class NavbarController {
    constructor(public readonly apiBaseUrl: string) { 
        'ngInject';
    }

    readonly areas = areas;
}
