import * as angular from 'angular';

const moduleName = 'necrodancer.ordinal';
export default moduleName;

angular
    .module(moduleName, [])
    .filter('ordinal', (): OrdinalFilter => {
        // http://stackoverflow.com/a/13627586/414137
        return i => {
            const j = i % 10,
                k = i % 100;
            if (j == 1 && k != 11) {
                return i + 'st';
            }
            if (j == 2 && k != 12) {
                return i + 'nd';
            }
            if (j == 3 && k != 13) {
                return i + 'rd';
            }
            return i + 'th';
        };
    });

export interface OrdinalFilter {
    (i: number): string;
}
