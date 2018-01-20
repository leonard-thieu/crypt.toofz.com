import * as angular from 'angular';

const moduleName = 'necrodancer.slug';
export default moduleName;

angular
    .module(moduleName, [])
    .filter('slug', (): SlugFilter => {
        return text => {
            if (typeof text === 'string') {
                return text.replace(/[\s#%&:/?+^{}\[\]"\\`|*<>]/g, '-');
            }
            return '';
        };
    });

export interface SlugFilter {
    (text: string | null): string;
}
