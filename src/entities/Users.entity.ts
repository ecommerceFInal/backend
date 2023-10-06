import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address.entity";
import { Anouncement } from "./Anouncements.entity";
import { Comment } from "./Comments.entity";
import { getRounds, hashSync } from "bcryptjs";

export enum TypeAccount {
  BUYER = "buyer",
  SELLER = "seller",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ length: 11 })
  phone: string;

  @Column()
  description: string;

  @Column({ type: "enum", enum: TypeAccount, default: TypeAccount.BUYER })
  type_account: TypeAccount;

  @Column({ length: 120 })
  password: string;

  @OneToOne(() => Address, (address) => address.user)
  address: Address;

  @OneToMany(() => Anouncement, (anouncement) => anouncement.user)
  anouncement: Array<Anouncement>;

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Array<Comment>;

  @BeforeInsert()
  hashPassword() {
    const hasRounds: number = getRounds(this.password);
    if (!hasRounds) {
      this.password = hashSync(this.password, 10);
    }
  }
}
