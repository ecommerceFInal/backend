import { string, z } from "zod";

const commentsSchema = z.object({
  id: z.string(),
  comment: z.string(),
  post_time: z.string(),
});

const commentsCreateSchema = commentsSchema.pick({
  comment: true,
});

const commentsReadSchema = commentsSchema;

const commentsReturnSchema = z.array(commentsReadSchema);

export {
  commentsSchema,
  commentsCreateSchema,
  commentsReadSchema,
  commentsReturnSchema,
};
