import { Controller } from "./Controller"

export type Route = {
    path: string,
    controllers: {[key: string]: Controller}   
}[]
