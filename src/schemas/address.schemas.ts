import { z } from "zod";

const addressSchema = z.object({
  id: z.string(),
  zip_code: z.string().max(8),
  state: z.string().max(30),
  city: z.string().max(30),
  street_name: z.string().max(70),
  street_number: z.number(),
  comp_address: z.string().max(70),
});

const addressCreateSchemas = addressSchema.omit({ id: true });

export { addressSchema, addressCreateSchemas };
