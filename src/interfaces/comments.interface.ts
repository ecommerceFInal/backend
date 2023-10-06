import { z } from "zod";
import {
  commentsCreateSchema,
  commentsReadSchema,
  commentsSchema,
} from "../schemas";
import { DeepPartial } from "typeorm";

type Comments = z.infer<typeof commentsSchema>;
type CommentsCreate = z.infer<typeof commentsCreateSchema>;
type CommentsRead = z.infer<typeof commentsReadSchema>;
type CommentsUpdate = DeepPartial<Comments>;

export { Comments, CommentsCreate, CommentsRead, CommentsUpdate };
