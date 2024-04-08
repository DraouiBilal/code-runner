import { type BunRequest, type Controller, MethodSchema, type Method, type Route } from "../types";


const routes: Route[] = [
]

const matchPath = (path: string, method: Method, routes: Route[]): {controller: Controller | null, params:{[key:string]:string}, found: boolean} => {
    const sections = path.split("/");
    for (let i = 0; i < routes.length; i++) {
        for (let j = 0; j < routes[i].length; j++) {
            const route = routes[i][j].path.split("/");
            let params:any = {};
            let match = true
            if (route.length !== sections.length) continue;
            for (let k = 0; k < route.length; k++) {
                if(route[k]!==sections[k]){
                    if(route[k][0]===":")
                        params[route[k].slice(1)] = sections[k];
                    else{
                        match = false;
                        break;
                    }
                }
            }
            if(match){
                return {controller:routes[i][j].controllers[method.toLowerCase()], params, found: true};
            }
        }
    }
    return {
        controller: null,
        params:{},
        found: false
    };
}

export const router = async (req: Request) => {

    const method = MethodSchema.parse(req.method);
    const path = "/" + req.url.split("/").slice(3).join("/");
    let body: any = null;

    try {
        body = await req.json();
    } catch (error: unknown) {
        if (error instanceof Error && error.name !== "SyntaxError") throw new Error(`500 ${error.message}`);
    }
    const {controller, params, found} = matchPath(path, method, routes);
    if(!found) throw new Error("404 Not found");
    if(!controller) throw new Error("405 Method not allowed");
    const request:BunRequest = {...req, url: path, params};
    return controller(request);
}
