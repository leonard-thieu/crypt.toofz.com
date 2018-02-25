import {
    Ng1StateDeclaration,
    StateParams,
} from '@uirouter/angularjs';
import * as util from '../util';
import { ToofzRestApi } from '../toofz-rest-api/toofz-rest-api';
import {
    EnumParamTypeDefinition,
    RouteValues,
} from './enum-param-type-definition';

const products: RouteValues = {
    current: [
        'amplified',
        'classic',
    ],
    legacy: {},
};
export const productParamTypeDefinition = new EnumParamTypeDefinition(products);

const characters: RouteValues = {
    current: [
        'all-characters',
        'all-characters-amplified',
        'aria',
        'bard',
        'bolt',
        'cadence',
        'coda',
        'diamond',
        'dorian',
        'dove',
        'eli',
        'mary',
        'melody',
        'monk',
        'nocturna',
        'story-mode',
        'tempo',
    ],
    legacy: {
        'all': 'all-characters',
        'story': 'story-mode',
    },
};
export const characterParamTypeDefinition = new EnumParamTypeDefinition(characters);

const runs: RouteValues = {
    current: [
        'score',
        'speed',
        'seeded-score',
        'seeded-speed',
        'deathless',
    ],
    legacy: {
        'seededscore': 'seeded-score',
        'seededspeed': 'seeded-speed',
    },
};
export const runParamTypeDefinition = new EnumParamTypeDefinition(runs);

const modes: RouteValues = {
    current: [
        'standard',
        'no-return',
        'hard',
        'phasing',
        'randomizer',
        'mystery',
    ],
    legacy: {
        'hard-mode': 'hard',
    },
};
export const modeParamTypeDefinition = new EnumParamTypeDefinition(modes);

export const leaderboardState: Ng1StateDeclaration = {
    name: 'root.leaderboard',
    url: `/leaderboards/{product:product}/{character:character}/{run:run}/{mode:mode}?{page:int}&{id}`,
    template: '<nd-leaderboard data="::$resolve.entries" player-entry="::$resolve.player"></nd-leaderboard>',
    params: {
        product: 'classic',
        mode: 'standard',
    },
    resolve: {
        leaderboard: ($stateParams: StateParams,
                      toofzRestApi: ToofzRestApi) => {
            'ngInject';
            let { product, mode, run, character } = $stateParams;

            return toofzRestApi.getLeaderboards({
                products: [product],
                modes: [mode],
                runs: [run],
                characters: [character],
                production: true,
                coOp: false,
                customMusic: false,
            }).then(leaderboardsEnvelope => {
                const leaderboard = leaderboardsEnvelope.leaderboards[0];
                if (!leaderboard) {
                    // TODO: Can this redirect instead?
                    throw new Error(`Leaderboard could not be found for parameters: ${JSON.stringify($stateParams)}.`);
                }

                return leaderboard;
            });
        },
        // This resolve is optional. If an entry can't be found, just display leaderboard entries without highlighting a player.
        player: ($stateParams: StateParams,
                 leaderboard: toofz.Leaderboard,
                 toofzRestApi: ToofzRestApi) => {
            'ngInject';
            const { id } = $stateParams;

            if (!id) {
                return undefined;
            }

            return toofzRestApi.getPlayerEntry(id, leaderboard.id)
                .catch(() => { });
        },
        entries: ($stateParams: StateParams,
                  leaderboard: toofz.Leaderboard,
                  player: toofz.Entry,
                  toofzRestApi: ToofzRestApi) => {
            'ngInject';
            const { page } = $stateParams;

            let offset: number;
            if (!page && player) {
                offset = util.roundDownToMultiple(player.rank - 1, 20);
            } else {
                offset = util.pageToOffset(page, 20)!;
            }
            const params = {
                offset,
            };

            return toofzRestApi.getLeaderboardEntries(leaderboard.id, params);
        },
    },
};

export const dailyLeaderboardState: Ng1StateDeclaration = {
    name: 'root.daily-leaderboard',
    url: `/leaderboards/{product:product}/daily?{date}&{production:bool}&{page:int}&{id}`,
    template: '<nd-leaderboard data="::$resolve.entries" player-entry="::$resolve.player"></nd-leaderboard>',
    params: {
        product: 'classic',
        production: true,
    },
    resolve: {
        leaderboard: ($stateParams: StateParams,
                      toofzRestApi: ToofzRestApi) => {
            'ngInject';
            const { product, date, production } = $stateParams;

            return toofzRestApi.getDailyLeaderboards({
                products: [product],
                date: date,
                production: production,
            }).then(data => {
                if (data.leaderboards.length < 1) {
                    throw new Error('No daily leaderboards were returned from toofz API.');
                }

                return data.leaderboards[0];
            });
        },
        // This resolve is optional. If an entry can't be found, just display leaderboard entries without highlighting a player.
        player: ($stateParams: StateParams,
                 leaderboard: toofz.DailyLeaderboard,
                 toofzRestApi: ToofzRestApi) => {
            'ngInject';
            const { id } = $stateParams;

            if (!id) {
                return undefined;
            }

            return toofzRestApi.getPlayerDailyEntry(id, leaderboard.id)
                .catch(() => { });
        },
        entries: ($stateParams: StateParams,
                  leaderboard: toofz.DailyLeaderboard,
                  player: toofz.Entry,
                  toofzRestApi: ToofzRestApi) => {
            'ngInject';
            const { page } = $stateParams;

            let offset: number;
            if (!page && player) {
                offset = util.roundDownToMultiple(player.rank - 1, 20);
            } else {
                offset = util.pageToOffset(page, 20)!;
            }
            const params = {
                offset,
            };

            return toofzRestApi.getDailyLeaderboardEntries(leaderboard.id, params);
        },
    },
};
