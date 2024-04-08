import {z} from "zod";

export const MethodSchema = z.enum(["GET","POST","PUT","PATCH","OPTION","DELETE"])

export type Method = z.infer<typeof MethodSchema>;
