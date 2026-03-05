import {  Column, Entity } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

@Entity("users")
export class Users extends BaseEntity{
    @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({ nullable: true })
  googleId!: string;

  @Column({ default: "local" })
  provider!: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  profilePicture!: string;
}