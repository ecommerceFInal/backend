import { Request, Response } from "express";
import { Comments, CommentsRead, CommentsUpdate } from "../interfaces";
import { commentsServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const tid: string = res.locals.user.id;
  const anouncement: any = res.locals.anouncement;
  const comment: Comments = await commentsServices.create(
    req.body,
    tid,
    anouncement
  );
  return res.status(201).json(comment);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const announcementId: string = req.params.id;
  const comments: CommentsRead = await commentsServices.read(announcementId);
  return res.status(200).json(comments);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const commentId: string = req.params.id;
  const comment: CommentsUpdate = await commentsServices.update(
    req.body,
    commentId
  );
  return res.status(200).json(comment);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const commentId: string = req.params.id;
  await commentsServices.destroy(commentId);
  return res.status(204).json();
};

export default { create, read, update, destroy };
