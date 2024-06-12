import { Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TFormat } from "./TFormat";

@Index("Col_pkey", ["col"], { unique: true })
@Entity("t-Col", { schema: "public" })
export class TCol {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Col" })
  col: string;

  @OneToMany(() => TFormat, (tFormat) => tFormat.pgNestedCol)
  tFormats: TFormat[];
}
