export interface BackendDefinition {
    description?: string;
    request: {
        method: string;
        url: string;
        data?: any;
        headers?: any;
        keys?: any[];
    };
    response: {
        data: string | any;
        headers?: any;
        text?: string;
    };
}

const toofzRestApiBackendDefinitions: BackendDefinition[] = require('./src/toofz-rest-api/toofz-rest-api.definitions.json');

export function getBackendDefinition(description: string) {
    for (let i = 0; i < toofzRestApiBackendDefinitions.length; i++) {
        let toofz_definition = toofzRestApiBackendDefinitions[i];
        if (toofz_definition.description === description) {
            return toofz_definition.response.data;
        }
    }

    throw new Error(`Unable to find backend definition with description '${description}'.`);
}
