import { Request, Response, json } from "express";
import anouncementsServices from "../services/anouncements.services";
import { AnnouncementRead, AnouncementsRead } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const userId: string = res.locals.user.id;
  const anouncement = await anouncementsServices.createAnnouncement(
    req.body,
    userId
  );
  return res.status(201).json(anouncement);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const announcements: AnouncementsRead = await anouncementsServices.read();
  return res.status(200).json(announcements);
};

const readById = async (req: Request, res: Response): Promise<Response> => {
  const anouncementId: string = req.params.id;
  const announcement: AnnouncementRead = await anouncementsServices.readById(
    anouncementId
  );
  return res.json(announcement);
};

const readAllForUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = req.params.id;
  const announcements: AnouncementsRead =
    await anouncementsServices.readAllForUser(userId);
  return res.status(200).json(announcements);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const id: string = req.params.id;
  const announcement: AnnouncementRead = await anouncementsServices.update(
    req.body,
    id
  );
  return res.status(200).json(announcement);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  await anouncementsServices.destroy(res.locals.announcement);
  return res.status(204).json();
};

export default { create, read, readById, readAllForUser, update, destroy };
