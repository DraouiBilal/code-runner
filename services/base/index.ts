import { type Serve } from "bun";
import { router } from "./router/router";

export default {
    development: process.env.NODE_ENV === "development",
    async fetch(req) {
        return await router(req);
    },
    error(error) {
        const message = error.message.slice(4);
        let status = parseInt(error.message.slice(0, 3));
        if (isNaN(status)) status = 500;
        return Response.json({
            status,
            message,
            name: error.name
        });
    },
    port: 5000
} satisfies Serve;
