import { Request, Response } from "express";
import { UserReturn } from "../interfaces";
import { userServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await userServices.create(req.body);
  return res.status(201).json(user);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await userServices.update(
    res.locals.foundId,
    req.body
  );
  return res.status(200).json(user);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  await userServices.destroy(res.locals.foundId);
  return res.status(204).json();
};

export default { create, update, destroy };
