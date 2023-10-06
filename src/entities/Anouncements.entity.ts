import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./Users.entity";
import { Comment } from "./Comments.entity";
import { Image } from "./Images.entity";

@Entity("anouncements")
export class Anouncement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 15 })
  brand: string;

  @Column({ length: 25 })
  model: string;

  @Column({ type: "smallint" })
  year: number;

  @Column({ length: 15 })
  fuel: string;

  @Column({ length: 8 })
  mileage: string;

  @Column({ length: 15 })
  color: string;

  @Column({ type: "float" })
  fipe_price: number;

  @Column({ type: "float" })
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.anouncement, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.anouncement)
  comment: Array<Comment>;

  @OneToMany(() => Image, (image) => image.anouncement, {
    onDelete: "CASCADE",
    cascade: true,
  })
  image: Array<Image>;
}
