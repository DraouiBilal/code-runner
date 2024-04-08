import { BunRequest } from "./BunRequest";

export type Controller = (req: BunRequest) => Promise<Response>
