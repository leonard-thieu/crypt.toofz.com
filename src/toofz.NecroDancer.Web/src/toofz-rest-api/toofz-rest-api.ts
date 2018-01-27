import { IHttpService } from 'angular';
import * as moment from 'moment';
import { toCommaSeparatedValues } from '../util';

export class ToofzRestApi {
    static getTimeDifference(date: string) {
        const serverDate = moment(date, 'ddd, DD MMM YYYY HH:mm:ss GMT', true);

        return serverDate.diff(moment());
    }

    static fixAmplifiedDeathlessAriaEntry(entry: toofz.Entry) {
        if (entry.version === 93 || entry.score < 0) {
            entry.score += 10;
            entry.end.zone = parseInt(('' + entry.score)[1] || '0');
            entry.end.zone += 1;
        }
    }

    constructor(private readonly $http: IHttpService,
                private readonly apiBaseUrl: string) {
        'ngInject';
    }

    getItems(params?: toofz.PaginationParams) {
        return this.$http.get<toofz.Items>(`${this.apiBaseUrl}/items`, {
            params: params,
        }).then(response => response.data);
    }

    getItemsByCategory(category: string, params?: toofz.PaginationParams) {
        return this.$http.get<toofz.Items>(`${this.apiBaseUrl}/items/${category}`, {
            params: params,
        }).then(response => response.data);
    }

    getItemsBySubcategory(category: string, subcategory: string, params?: toofz.PaginationParams) {
        return this.$http.get<toofz.Items>(`${this.apiBaseUrl}/items/${category}/${subcategory}`, {
            params: params,
        }).then(response => response.data);
    }

    getEnemies(params?: toofz.PaginationParams) {
        return this.$http.get<toofz.Enemies>(`${this.apiBaseUrl}/enemies`, {
            params: params,
        }).then(response => response.data);
    }

    getEnemiesByAttribute(attribute: string, params?: toofz.PaginationParams) {
        return this.$http.get<toofz.Enemies>(`${this.apiBaseUrl}/enemies/${attribute}`, {
            params: params,
        }).then(response => response.data);
    }

    getLeaderboards(params?: toofz.GetLeaderboardsParams) {
        if (params) {
            params.products = toCommaSeparatedValues(params.products);
            params.modes = toCommaSeparatedValues(params.modes);
            params.runs = toCommaSeparatedValues(params.runs);
            params.characters = toCommaSeparatedValues(params.characters);
        }

        return this.$http.get<toofz.Leaderboards>(`${this.apiBaseUrl}/leaderboards`, {
            params: params,
        }).then(response => {
            const { headers, data } = response;
            const diff = ToofzRestApi.getTimeDifference(headers('Date'));

            for (const leaderboard of data.leaderboards) {
                const updated_at = moment(leaderboard.updated_at);
                updated_at.add(diff);
                leaderboard.updated_at = updated_at.toISOString();
            }

            return response;
        }).then(response => response.data);
    }

    getLeaderboardEntries(id: number, params?: toofz.PaginationParams) {
        return this.$http.get<toofz.LeaderboardEntries>(`${this.apiBaseUrl}/leaderboards/${id}/entries`, {
            params: params,
        }).then(response => {
            const { headers, data } = response;
            const diff = ToofzRestApi.getTimeDifference(headers('Date'));

            const leaderboard = data.leaderboard;
            const updated_at = moment(leaderboard.updated_at);
            updated_at.add(diff);
            leaderboard.updated_at = updated_at.toISOString();

            return response;
        }).then(response => {
            const data = response.data;
            const leaderboard = data.leaderboard;

            if (leaderboard.product === 'amplified' &&
                leaderboard.run === 'deathless' &&
                leaderboard.character === 'aria') {
                for (const entry of data.entries) {
                    ToofzRestApi.fixAmplifiedDeathlessAriaEntry(entry);
                }
            }

            if (leaderboard.character === 'aria') {
                let maxZones: number;
                switch (leaderboard.product) {
                    case 'classic':
                        maxZones = 4;
                        break;
                    case 'amplified':
                        maxZones = 5;
                        break;
                    default:
                        throw new Error(`Unknown product: '${leaderboard.product}'.`);
                }
                for (const entry of data.entries) {
                    entry.end.zone = maxZones - entry.end.zone + 1;
                }
            }

            return response;
        }).then(response => response.data);
    }

    getDailyLeaderboards(params?: toofz.GetDailyLeaderboardsParams) {
        if (params) {
            params.products = toCommaSeparatedValues(params.products);
        }

        return this.$http.get<toofz.DailyLeaderboards>(`${this.apiBaseUrl}/leaderboards/dailies`, {
            params: params,
        }).then(response => {
            const { headers, data } = response;
            const diff = ToofzRestApi.getTimeDifference(headers('Date'));

            for (const leaderboard of data.leaderboards) {
                const updated_at = moment(leaderboard.updated_at);
                updated_at.add(diff);
                leaderboard.updated_at = updated_at.toISOString();
            }

            return response;
        }).then(response => response.data);
    }

    getDailyLeaderboardEntries(id: number, params?: toofz.PaginationParams) {
        return this.$http.get<toofz.DailyLeaderboardEntries>(`${this.apiBaseUrl}/leaderboards/dailies/${id}/entries`, {
            params: params,
        }).then(response => {
            const { headers, data } = response;
            const diff = ToofzRestApi.getTimeDifference(headers('Date'));

            const leaderboard = data.leaderboard;
            const updated_at = moment(leaderboard.updated_at);
            updated_at.add(diff);
            leaderboard.updated_at = updated_at.toISOString();

            return response;
        }).then(response => response.data);
    }

    getPlayers(query: string, params?: toofz.PaginationParams) {
        return this.$http.get<toofz.Players>(`${this.apiBaseUrl}/players`, {
            params: {
                q: query,
                ...params,
            },
        }).then(response => response.data);
    }

    getPlayerEntries(id: string, params?: toofz.GetPlayerEntriesParams) {
        if (params) {
            params.products = toCommaSeparatedValues(params.products);
        }

        return this.$http.get<toofz.PlayerEntries>(`${this.apiBaseUrl}/players/${id}/entries`, {
            params: params,
        }).then(response => {
            const { headers, data } = response;
            const diff = ToofzRestApi.getTimeDifference(headers('Date'));

            const player = data.player;
            const updated_at = moment(player.updated_at!);
            updated_at.add(diff);
            player.updated_at = updated_at.toISOString();

            for (const entry of data.entries) {
                const updated_at = moment(entry.leaderboard!.updated_at);
                updated_at.add(diff);
                entry.leaderboard!.updated_at = updated_at.toISOString();
            }

            return response;
        }).then(response => {
            const data = response.data;

            for (const entry of data.entries) {
                const leaderboard = entry.leaderboard!;
                if (leaderboard.product === 'amplified' &&
                    leaderboard.run === 'deathless' &&
                    leaderboard.character === 'aria') {
                    ToofzRestApi.fixAmplifiedDeathlessAriaEntry(entry);
                }

                if (leaderboard.character === 'aria') {
                    let maxZones: number;
                    switch (leaderboard.product) {
                        case 'classic':
                            maxZones = 4;
                            break;
                        case 'amplified':
                            maxZones = 5;
                            break;
                        default:
                            throw new Error(`Unknown product: '${leaderboard.product}'.`);
                    }
                    for (const entry of data.entries) {
                        entry.end.zone = maxZones - entry.end.zone + 1;
                    }
                }
            }

            return response;
        }).then(response => response.data);
    }

    getPlayerEntry(steamId: string, lbid: number) {
        return this.$http.get<toofz.Entry>(`${this.apiBaseUrl}/players/${steamId}/entries/${lbid}`)
            .then(response => response.data);
    }

    getPlayerDailyEntries(id: string, params?: toofz.GetPlayerDailyEntriesParams) {
        if (params) {
            params.products = toCommaSeparatedValues(params.products);
        }

        return this.$http.get<toofz.PlayerDailyEntries>(`${this.apiBaseUrl}/players/${id}/entries/dailies`, {
            params: params,
        }).then(response => {
            const { headers, data } = response;
            const diff = ToofzRestApi.getTimeDifference(headers('Date'));

            const player = data.player;
            const updated_at = moment(player.updated_at!);
            updated_at.add(diff);
            player.updated_at = updated_at.toISOString();

            for (const entry of data.entries) {
                const updated_at = moment(entry.leaderboard!.updated_at);
                updated_at.add(diff);
                entry.leaderboard!.updated_at = updated_at.toISOString();
            }

            return response;
        }).then(response => response.data);
    }

    getPlayerDailyEntry(steamId: string, lbid: number) {
        return this.$http.get<toofz.DailyEntry>(`${this.apiBaseUrl}/players/${steamId}/entries/dailies/${lbid}`)
            .then(response => response.data);
    }
}
