import api from "../lib/api";
import { Controller } from "../types";

export const dockerController: Controller = async (req) => {
    const res = await api.post("/containers/create",{
        Image: "nginx:latest",
        Cmd:["bash"]
    },{},true);
    return Response.json(res);
}
