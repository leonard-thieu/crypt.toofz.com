import { ParamTypeDefinition } from '@uirouter/angularjs';

export interface RouteValues {
    current: string[];
    legacy: LegacyRouteValueMap;
}

interface LegacyRouteValueMap {
    [original: string]: string;
}

export class EnumParamTypeDefinition implements ParamTypeDefinition {
    constructor(private readonly routeValues: RouteValues) {
        let patternStr = routeValues.current
            .concat(Object.keys(routeValues.legacy))
            .join('|');

        this.pattern = new RegExp(patternStr);
    }

    pattern?: RegExp | undefined;

    encode(val: any, key?: string | undefined): string | string[] {
        return val;
    }

    decode(val: string, key?: string | undefined) {
        val = val.toLowerCase();

        const current = this.routeValues.legacy[val];
        if (current) {
            val = current;
        }

        return val;
    }

    is(val: any, key?: string | undefined): boolean {
        return this.routeValues.current.indexOf(val) !== -1;
    }

    equals(a: any, b: any): boolean {
        return a === b;
    }
}
