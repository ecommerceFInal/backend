import { string, z } from "zod";
import { imageCreateSchema, imageReadSchema } from "./images,schemas";
import { userSchema } from "./user.schemas";
import { commentsSchema } from "./comments.schemas";

const anouncementsSchema = z.object({
  id: z.string(),
  brand: z.string().max(15),
  model: z.string().max(25),
  year: z.number(),
  fuel: z.string().max(15),
  mileage: z.string().max(8),
  color: z.string().max(15),
  fipe_price: z.number(),
  price: z.number(),
  description: z.string(),
});

const anouncementsCreateSchema = anouncementsSchema
  .omit({
    id: true,
  })
  .extend({
    image: imageCreateSchema,
  });

const anouncementsReadSchema = anouncementsSchema.extend({
  user: userSchema.omit({
    cpf: true,
    type_account: true,
    password: true,
  }),
  image: imageReadSchema.array().nullish(),
  comments: commentsSchema.array().nullish(),
});

const announcemetsReturnSchema = z.array(anouncementsReadSchema);

const announcementsUpdateSchema = anouncementsCreateSchema.partial();

export {
  anouncementsSchema,
  anouncementsCreateSchema,
  anouncementsReadSchema,
  announcementsUpdateSchema,
  announcemetsReturnSchema,
};
