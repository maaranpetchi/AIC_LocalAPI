import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { TItem } from "./TItem";
import { TFormat } from "./TFormat";

@Index("Cell_pkey", ["cell"], { unique: true })
@Entity("t-Cell", { schema: "public" })
export class TCell {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Cell" })
  cell: string;

  @Column("bigint", { name: "Col" })
  col: string;

  colFormatDetails?: TFormat[];

  @Column("bigint", { name: "Row" })
  row: string;

  @Column("bigint", { name: "Data-Type", nullable: true })
  dataType: string | null;

  @Column("jsonb", { name: "DropDown-Source", nullable: true })
  dropDownSource: object | null;

  @Column("bigint", { name: "Items", nullable: true })
  items: TItem[] | null;

  itemDetails?: TItem[];
}
