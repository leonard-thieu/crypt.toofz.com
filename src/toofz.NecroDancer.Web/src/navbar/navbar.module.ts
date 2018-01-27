import * as navbarTemplate from './navbar.html';
import '../characters/characters.scss';
import './navmenu.scss';

import * as angular from 'angular';
import dropdown from '../dropdown/dropdown.module';

import { NavbarController } from './navbar-controller';

const moduleName = 'necrodancer.navbar';
export default moduleName;

angular
    .module(moduleName, [
        dropdown,
    ])
    /**
     * @ngdoc directive
     * @name ndNavbar
     * @restrict E
     */
    .component('ndNavbar', {
        template: navbarTemplate,
        controller: NavbarController,
    });
