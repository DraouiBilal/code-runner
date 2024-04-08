import {$} from "bun";
const url = "localhost"
export const BASE_API_URL = `http://${url}`;

const apiCaller = async <Req, Res>(url: string, method: string, body?: Req, headers?: { [key: string]: string }): Promise<Res> => {

    const options: any = {
        method,
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const res = await fetch(BASE_API_URL + url, options);

    if (!res.ok) {
        const resJson = await res.json() as { message: string };
        console.log("reJSON", resJson);

        throw new Error(resJson.message);
    }

    const resJson = await res.json() as Res;

    return resJson;
};

const socketCaller = async <Req, Res>(url: string, method: string, body?: Req, headers?: { [key: string]: string }): Promise<Res> => {
    const curlRes = await $`curl -X ${method} ${body && `-d ${JSON.stringify(body)}`} -H 'Content-Type: application/json' --unix-socket /var/run/docker.sock http://localhost${url}`.json();
    console.log(`curl -X ${method} ${body && `-d '${JSON.stringify(body)}`}' -H 'Content-Type: application/json' --unix-socket /var/run/docker.sock http://localhost${url}`);
    return curlRes;
}

const api = {
    get: <Req, Res>(url: string, body?: any, headers?: { [key: string]: string}, isSocket?: boolean) => {
        return isSocket? socketCaller<Req, Res>(url, "GET", body, headers):apiCaller<Req, Res>(url, "GET", body, headers);
    },

    post: <Req, Res>(url: string, body?: any, headers?: { [key: string]: string}, isSocket?: boolean) => {
        return isSocket? socketCaller<Req, Res>(url, "POST", body, headers):apiCaller<Req, Res>(url, "POST", body, headers);
    },

    put: <Req, Res>(url: string, body?: any, headers?: { [key: string]: string}, isSocket?: boolean) => {
        return isSocket? socketCaller<Req, Res>(url, "PUT", body, headers):apiCaller<Req, Res>(url, "PUT", body, headers);
    },

    delete: <Req, Res>(url: string, body?: any, headers?: { [key: string]: string}, isSocket?: boolean) => {
        return isSocket? socketCaller<Req, Res>(url, "DELETE", body, headers):apiCaller<Req, Res>(url, "DELETE", body, headers);
    },

    patch: <Req, Res>(url: string, body?: any, headers?: { [key: string]: string}, isSocket?: boolean) => {
        return isSocket? socketCaller<Req, Res>(url, "PATCH", body, headers):apiCaller<Req, Res>(url, "PATCH", body, headers);
    },

    options: <Req, Res>(url: string, body?: any, headers?: { [key: string]: string}, isSocket?: boolean) => {
        return isSocket? socketCaller<Req, Res>(url, "OPTIONS", body, headers):apiCaller<Req, Res>(url, "OPTIONS", body, headers);
    },

    head: <Req, Res>(url: string, body?: any, headers?: { [key: string]: string}, isSocket?: boolean) => {
        return isSocket? socketCaller<Req, Res>(url, "HEAD", body, headers):apiCaller<Req, Res>(url, "HEAD", body, headers);
    }
};

export default api;
