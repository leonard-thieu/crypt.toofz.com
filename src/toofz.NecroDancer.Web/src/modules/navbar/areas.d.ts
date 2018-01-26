declare module '*/areas.json' {
    const areas: toofzSite.Category[];
    export = areas;
}

declare namespace toofzSite {
    interface Category {
        name: string;
        state?: State;
        classes?: string;
        categories?: Category[];
    }

    interface State {
        name: string;
        params: Params;
    }

    interface Params {
        [param: string]: string;
    }
}
