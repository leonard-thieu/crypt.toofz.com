import {
    Ng1StateDeclaration,
    StateParams,
} from '@uirouter/angularjs';
import { ToofzRestApi } from '../toofz-rest-api/toofz-rest-api';

export const profileState: Ng1StateDeclaration = {
    name: 'root.profile',
    url: '/p/{id}/{slug}',
    params: {
        slug: '-',
    },
    template: '<nd-profile></nd-profile>',
    redirectTo: 'root.profile.amplified',
};

export const profileClassicState: Ng1StateDeclaration = {
    name: 'root.profile.classic',
    url: '/classic',
    template: '<nd-profile-entries data="::$resolve.classic"></nd-profile-entries>',
    resolve: {
        classic: ($stateParams: StateParams,
                  toofzRestApi: ToofzRestApi) => {
            'ngInject';
            const { id } = $stateParams;

            return toofzRestApi.getPlayerEntries(id, {
                products: ['classic'],
                production: true,
                coOp: false,
                customMusic: false,
            });
        },
    },
};

export const profileAmplifiedState: Ng1StateDeclaration = {
    name: 'root.profile.amplified',
    url: '/amplified',
    template: '<nd-profile-entries data="::$resolve.amplified"></nd-profile-entries>',
    resolve: {
        amplified: ($stateParams: StateParams,
                    toofzRestApi: ToofzRestApi) => {
            'ngInject';
            const { id } = $stateParams;

            return toofzRestApi.getPlayerEntries(id, {
                products: ['amplified'],
                production: true,
                coOp: false,
                customMusic: false,
            });
        },
    },
};

export const profileClassicDailiesState: Ng1StateDeclaration = {
    name: 'root.profile.classic-dailies',
    url: '/classic-dailies',
    template: '<nd-profile-daily-entries data="::$resolve.classic"></nd-profile-daily-entries>',
    resolve: {
        classic: ($stateParams: StateParams,
                  toofzRestApi: ToofzRestApi) => {
            'ngInject';
            const { id } = $stateParams;

            return toofzRestApi.getPlayerDailyEntries(id, {
                products: ['classic'],
                production: true,
            });
        },
    },
};

export const profileAmplifiedDailiesState: Ng1StateDeclaration = {
    name: 'root.profile.amplified-dailies',
    url: '/amplified-dailies',
    template: '<nd-profile-daily-entries data="::$resolve.amplified"></nd-profile-daily-entries>',
    resolve: {
        amplified: ($stateParams: StateParams,
                    toofzRestApi: ToofzRestApi) => {
            'ngInject';
            const { id } = $stateParams;

            return toofzRestApi.getPlayerDailyEntries(id, {
                products: ['amplified'],
                production: true,
            });
        },
    },
};
