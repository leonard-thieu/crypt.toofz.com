import * as angular from 'angular';

/**
 * @ngdoc directive
 * @name ndDropdown
 * @restrict E
 *
 * @param {expression} category
 */
/**
 * @ngdoc directive
 * @name ndSubmenu
 * @restrict E
 *
 * @param {expression} category
 */

angular
    .module('necrodancer.dropdown', [])
    .component('ndDropdown', {
        templateUrl: fingerprint.get(__dirname + '/dropdown.html'),
        bindings: {
            category: '<'
        }
    })
    .component('ndSubmenu', {
        templateUrl: fingerprint.get(__dirname + '/submenu.html'),
        bindings: {
            category: '<'
        }
    });