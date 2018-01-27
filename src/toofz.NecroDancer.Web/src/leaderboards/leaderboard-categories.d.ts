declare module '*/leaderboard-categories.json' {
    const content: toofzSite.Leaderboard.Categories;
    export = content;
}

declare namespace toofzSite {
    namespace Leaderboard {
        interface Categories {
            [name: string]: CategoryItems;
        }

        interface CategoryItems {
            [name: string]: CategoryItem;
        }

        interface CategoryItem {
            display_name: string;
            order: number;
            value?: boolean;
            icon?: string;
        }

        interface Headers {
            leaderboards: Header[];
        }

        interface Header {
            id: number;
            display_name: string;
            product: string;
            mode: string;
            run: string;
            character: string;
        }
    }
}
