import { z } from "zod";

const imageSchema = z.object({
  id: z.string(),
  cover_img: z.string().max(300).optional(),
  first_img: z.string().max(300).optional(),
  second_img: z.string().max(300).optional(),
});

const imageCreateSchema = imageSchema.omit({ id: true });

const imageReadSchema = imageSchema.array();

export { imageSchema, imageCreateSchema, imageReadSchema };
