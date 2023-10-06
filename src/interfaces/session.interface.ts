import { z } from "zod";
import { sessionSchemas } from "../schemas";

type SessionCreate = z.infer<typeof sessionSchemas>;
type SessionReturn = { token: string };

export { SessionCreate, SessionReturn };
