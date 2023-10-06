import { z } from "zod";
import {
  anouncementsCreateSchema,
  anouncementsReadSchema,
  anouncementsSchema,
} from "../schemas";
import { DeepPartial, Repository } from "typeorm";
import { Anouncement } from "../entities";

type AnouncementsCreate = z.infer<typeof anouncementsCreateSchema>;
type AnnouncementRead = z.infer<typeof anouncementsSchema>;
type AnouncementsRead = z.infer<typeof anouncementsReadSchema>;
type AnouncementsRepo = Repository<Anouncement>;
type AnouncementUpdate = DeepPartial<AnnouncementRead>;

export {
  AnouncementsCreate,
  AnouncementsRead,
  AnouncementsRepo,
  AnnouncementRead,
  AnouncementUpdate,
};
