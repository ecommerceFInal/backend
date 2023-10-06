import { Anouncement } from "../entities";
import { AppError } from "../errors";
import {
  AnnouncementRead,
  AnouncementUpdate,
  AnouncementsCreate,
  AnouncementsRead,
} from "../interfaces";
import { anouncementsRepository } from "../repositories";
import userRepository from "../repositories/user.repository";
import {
  announcemetsReturnSchema,
  anouncementsReadSchema,
  anouncementsSchema,
} from "../schemas";

const createAnnouncement = async (
  { image, ...data }: AnouncementsCreate,
  userId: string
): Promise<AnnouncementRead> => {
  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) throw new AppError("User not found", 404);

  const anouncement: Anouncement = anouncementsRepository.create({
    ...data,
    user: user,
  });
  await anouncementsRepository.save(anouncement);
  return anouncementsReadSchema.parse(anouncement);
};

const read = async (): Promise<AnouncementsRead> => {
  return anouncementsReadSchema.parse(
    await anouncementsRepository.find({
      relations: ["user", "image", "comment"],
    })
  );
};

const readById = async (anouncementId: string): Promise<AnouncementsRead> => {
  const anouncement: Anouncement | null = await anouncementsRepository.findOne({
    where: {
      id: anouncementId,
    },
    relations: {
      user: true,
      image: true,
      comment: true,
    },
  });

  if (!anouncement) {
    throw new AppError("Anouncement not found", 404);
  }

  return anouncementsReadSchema.parse(anouncement);
};

const readAllForUser = async (userId: string): Promise<AnouncementsRead> => {
  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) throw new AppError("User not found", 404);

  const announcements: Anouncement[] = await anouncementsRepository.find({
    where: {
      user: { id: userId },
    },
    relations: ["user", "image", "comment"],
  });

  if (!announcements) {
    throw new AppError("Announcement not found!", 404);
  }
  return anouncementsReadSchema.parse(announcements);
};

const update = async (
  data: AnouncementUpdate,
  id: string
): Promise<AnnouncementRead> => {
  const updateAnouncement: any | null = await anouncementsRepository.findOne({
    where: {
      id,
    },
    relations: {
      image: true,
      user: true,
      comment: true,
    },
  });

  if (!updateAnouncement || updateAnouncement.id !== id) {
    throw new AppError("Announcement not found", 404);
  }

  const edit = anouncementsRepository.create({
    ...(updateAnouncement || {}),
    ...data,
  });

  await anouncementsRepository.save(edit);
  return anouncementsSchema.parse(edit);
};

const destroy = async (id: string): Promise<void> => {
  const announcement: Anouncement | null =
    await anouncementsRepository.findOneBy({ id });

  if (!announcement) {
    throw new AppError("Announcement not found!", 404);
  }

  await anouncementsRepository.remove(announcement);
};

export default {
  createAnnouncement,
  read,
  readById,
  readAllForUser,
  update,
  destroy,
};
