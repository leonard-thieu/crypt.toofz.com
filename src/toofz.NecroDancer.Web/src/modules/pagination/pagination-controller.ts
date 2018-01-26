export class PaginationController {
    private static getRecords(offset: number, limit: number, total: number) {
        return {
            start: offset + 1,
            end: Math.min(offset + limit, total),
            total: total
        };
    }

    private static getPages(offset: number, limit: number, total: number) {
        const start = 1;
        const end = Math.ceil(total / limit);
        const current = Math.floor(offset / limit) + 1;

        const { midStart, midEnd, mid } = this.getMiddlePages(start, end, current);
        const isStartVisible = this.getIsStartVisible(current, midStart, start);
        const isEndVisible = this.getIsEndVisible(current, midEnd, end);

        return {
            isStartVisible: isStartVisible,
            isEndVisible: isEndVisible,
            start: start,
            middle: mid,
            end: end,
            current: current
        };
    }

    private static getMiddlePages(start: number, end: number, current: number) {
        const midMin = start + 4;
        const midMax = end - 4;

        let midStart: number,
            midEnd: number;

        if (current < midMin) {
            midStart = start;
            midEnd = midMin;
        } else if (current > midMax) {
            midStart = midMax;
            midEnd = end;
        } else {
            midStart = current - 1;
            midEnd = current + 1;
        }
        midStart = Math.min(Math.max(midStart, start), end);
        midEnd = Math.min(Math.max(midEnd, start), end);

        const mid = [];
        for (let i = midStart; i <= midEnd; i++) {
            mid.push(i);
        }

        return { midStart, midEnd, mid };
    }

    private static getIsStartVisible(current: number, midStart: number, start: number) {
        return current >= midStart && midStart !== start;
    }

    private static getIsEndVisible(current: number, midEnd: number, end: number) {
        return current <= midEnd && midEnd !== end;
    }

    // region Inputs

    readonly data: Pagination;

    // endregion

    // Data for pagination summary.
    //   Showing 81 to 100 of 104 entries
    records: Records;
    // Data for paging controls.
    pages: Pages;

    $onInit() {
        let { offset, limit, total } = this.data;

        if (typeof offset !== 'number') {
            offset = 0;
        }

        this.records = PaginationController.getRecords(offset, limit, total);
        this.pages = PaginationController.getPages(offset, limit, total);
    }
}
