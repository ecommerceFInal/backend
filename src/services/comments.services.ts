import { Anouncement, Comment, User } from "../entities";
import { AppError } from "../errors";
import { CommentsCreate, CommentsUpdate } from "../interfaces";
import { anouncementsRepository, commentsRepository } from "../repositories";
import userRepository from "../repositories/user.repository";
import { commentsReadSchema } from "../schemas";

const create = async (
  data: CommentsCreate,
  tid: string,
  announcement: Anouncement[]
) => {
  const user: User | null = await userRepository.findOneBy({ id: tid });

  const payload: any = {
    ...data,
    user: user!,
    announcement: announcement,
  };

  const comment: Comment[] = commentsRepository.create(payload);
  await commentsRepository.save(comment);
  return commentsReadSchema.parse(comment);
};

const read = async (id: string) => {
  const announcement: Anouncement | null =
    await anouncementsRepository.findOneBy({ id });
  if (!announcement) {
    throw new AppError("Announcement not found", 404);
  }
  const comments: Comment[] = await commentsRepository.find({
    where: {
      anouncement: { id: id },
    },
    relations: ["user", "anouncement"],
  });

  return commentsReadSchema.parse(comments);
};

const update = async (
  commentId: string,
  data: any
): Promise<CommentsUpdate> => {
  const comment: Comment | null = await commentsRepository.findOne({
    where: {
      id: commentId,
    },
    relations: {
      anouncement: true,
      user: true,
    },
  });
  if (!comment || comment.id !== commentId) {
    throw new AppError("Comment not found", 404);
  }
  const commentUpdate: Comment[] = commentsRepository.create({
    ...(comment || {}),
    ...data,
  });

  await commentsRepository.save(commentUpdate);
  return commentsReadSchema.parse(commentUpdate);
};

const destroy = async (commentId: string): Promise<void> => {
  const comment: Comment | null = await commentsRepository.findOneBy({
    id: commentId,
  });
  if (!comment) {
    throw new AppError("Comment not found!", 404);
  }
  await commentsRepository.remove(comment);
};

export default { create, read, update, destroy };
