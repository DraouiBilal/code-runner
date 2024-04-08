import { dockerController } from "../controllers/dockerController"
import { type Route } from "../types/Route"

export const dockerRouter:Route = [
    {
        path: "/docker",
        controllers: {
            get: dockerController
        }
    }
]
