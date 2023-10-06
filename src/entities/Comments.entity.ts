import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Users.entity";
import { Anouncement } from "./Anouncements.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  post_time: string | Date;

  @Column()
  comment: string;

  @ManyToOne(() => User, (user) => user.comment)
  user: User;

  @ManyToOne(() => Anouncement, (anouncement) => anouncement.comment)
  anouncement: Array<Anouncement>;
}
