import { addRouter } from "../lib/routing";
import { dockerRouter } from "./dockerRouter";

export const initRouter = () => {
    addRouter(dockerRouter);
}
