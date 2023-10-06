import { userSchema } from "./user.schemas";

const sessionSchemas = userSchema.pick({ email: true, password: true });

export { sessionSchemas };
