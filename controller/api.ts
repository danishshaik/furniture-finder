import * as Config from '../config';

const api = {
    async post(endpoint: string, body: any, headers?: any): Promise<any> {
        const url = Config.apiUrl + endpoint
        var options = {
            method: 'POST',
            headers: {
                ...headers,
            },
            body: body,
        }
        const response = await fetch(url, options);
        const json = await response.json();
        return json;
    }
}

export default api;