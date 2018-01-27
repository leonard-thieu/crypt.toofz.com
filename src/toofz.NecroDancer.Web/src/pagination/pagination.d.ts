interface Pagination {
    offset: number | undefined;
    limit: number;
    total: number;
}

interface Records {
    start: number;
    end: number;
    total: number;
}

interface Pages {
    isStartVisible: boolean;
    isEndVisible: boolean;
    start: number;
    middle: number[];
    end: number;
    current: number;
}
