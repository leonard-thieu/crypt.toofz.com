import { IHttpService } from 'angular';

export class ToofzSiteApi {
    constructor(private readonly $http: IHttpService) {
        'ngInject';
    }

    getAreas() {
        return this.$http.get<toofzSite.Areas>(fingerprint.get('/data/areas.min.json'), {
            cache: true
        }).then(response => response.data.areas);
    }

    getLeaderboardCategories() {
        return this.$http.get<toofzSite.Leaderboard.CategoriesResponse>(fingerprint.get('/data/leaderboard-categories.min.json'), {
            cache: true
        }).then(response => response.data.categories);
    }
}
