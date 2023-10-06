import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Anouncement } from "./Anouncements.entity";

@Entity("images")
export class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 300 })
  cover_img: string;

  @Column({ length: 300 })
  first_img: string;

  @Column({ length: 300 })
  second_img: string;

  @ManyToOne(() => Anouncement, (anouncement) => anouncement.image)
  anouncement: Anouncement;
}
