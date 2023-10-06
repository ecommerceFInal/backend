import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./Users.entity";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 8 })
  zip_code: string;

  @Column({ length: 30 })
  state: string;

  @Column({ length: 30 })
  city: string;

  @Column({ length: 70 })
  street_name: string;

  @Column({ type: "smallint" })
  street_number: number;

  @Column({ length: 70 })
  comp_address: string;

  @OneToOne(() => User, (user) => user.address, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}
