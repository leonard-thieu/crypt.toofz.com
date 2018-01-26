import * as dropdownTemplate from './dropdown.html';
import * as submenuTemplate from './submenu.html';

import * as angular from 'angular';

const moduleName = 'necrodancer.dropdown';
export default moduleName;

angular
    .module(moduleName, [])
    /**
     * @ngdoc directive
     * @name ndDropdown
     * @restrict E
     *
     * @param {expression} category
     */
    .component('ndDropdown', {
        template: dropdownTemplate,
        bindings: {
            category: '<',
        },
    })
    /**
     * @ngdoc directive
     * @name ndSubmenu
     * @restrict E
     *
     * @param {expression} category
     */
    .component('ndSubmenu', {
        template: submenuTemplate,
        bindings: {
            category: '<',
        },
    });
