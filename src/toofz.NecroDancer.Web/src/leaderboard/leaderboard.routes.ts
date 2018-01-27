import {
    Ng1StateDeclaration,
    StateParams,
} from '@uirouter/angularjs';
import * as util from '../util';
import { ToofzRestApi } from '../toofz-rest-api/toofz-rest-api';

const products = ['amplified', 'classic'].join('|');
const characters = ['all', 'all-characters', 'all-characters-amplified', 'aria', 'bard', 'bolt', 'cadence', 'coda',
    'diamond', 'dorian', 'dove', 'eli', 'mary', 'melody', 'monk', 'nocturna', 'story', 'story-mode', 'tempo'].join('|');
const runs = ['score', 'speed', 'seededscore', 'seeded-score', 'seededspeed', 'seeded-speed', 'deathless'].join('|');
const modes = ['standard', 'no-return', 'hard-mode', 'hard', 'phasing', 'randomizer', 'mystery'].join('|');

export const leaderboardState: Ng1StateDeclaration = {
    name: 'root.leaderboard',
    url: `/leaderboards/{product:${products}}/{character:${characters}}/{run:${runs}}/{mode:${modes}}?{page:int}&{id}`,
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

            product = product.toLowerCase();
            mode = mode.toLowerCase();
            run = run.toLowerCase();
            character = character.toLowerCase();

            switch (mode) {
                case 'hard-mode':
                    mode = 'hard';
                    break;
            }

            switch (run) {
                case 'seededscore':
                    run = 'seeded-score';
                    break;
                case 'seededspeed':
                    run = 'seeded-speed';
                    break;
            }

            switch (character) {
                case 'all':
                    character = 'all-characters';
                    break;
                case 'story':
                    character = 'story-mode';
                    break;
            }

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
    url: `/leaderboards/{product:${products}}/daily?{date}&{production:bool}&{page:int}&{id}`,
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
