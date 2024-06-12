import { Column, Entity, Index, OneToMany, PrimaryColumn } from "typeorm";
import { TFormat } from "./TFormat";
import { TTx } from "./TTx";

@Index("User_ukey", ["user"], { unique: true })
@Entity("t-User", { schema: "public" })
export class TUser {
  @PrimaryColumn("bigint", { name: "User", unique: true, primary: false })
  user: string;

  @Column("bigint", { name: "User-Type" })
  userType: string;

  @OneToMany(() => TFormat, (tFormat) => tFormat.deletedBy)
  tFormats: TFormat[];

  @OneToMany(() => TFormat, (tFormat) => tFormat.user)
  tFormats2: TFormat[];

  @OneToMany(() => TTx, (tTx) => tTx.txUser)
  tTxes: TTx[];
}
