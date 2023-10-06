import { z } from "zod";
import { TypeAccount } from "../entities/Users.entity";
import { addressCreateSchemas } from "./address.schemas";

const userSchema = z.object({
  id: z.string(),
  username: z.string().max(50),
  email: z.string().email(),
  cpf: z.string().max(11),
  phone: z.string().max(11),
  description: z.string(),
  type_account: z.nativeEnum(TypeAccount),
  address: addressCreateSchemas,
  password: z.string().max(120),
});

const userCreateSchema = userSchema.omit({ id: true });

const userReturnSchema = userSchema.omit({ password: true });

const userReadSchema = userReturnSchema.array();

const userUpdateSchema = userCreateSchema.partial();

export {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  userUpdateSchema,
};
