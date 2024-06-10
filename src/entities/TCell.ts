import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TCol } from "./TCol";
import { TRow } from "./TRow";
import { TFormat } from "./TFormat";
import { TItem } from "./TItem"; // Add import for TItem

@Index("Cell_pkey", ["cell"], { unique: true })
@Entity("t-Cell", { schema: "public"})
export class TCell {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Cell" })
  cell: string;

  @Column("jsonb", { name: "DropDown-Source", nullable: true })
  dropDownSource: object | null;

  @Column("bigint", { name: "Col", nullable: false })
  col1: TCol;

  @ManyToOne(() => TCol, (tCol) => tCol.tCells)
  @JoinColumn([{ name: "Col", referencedColumnName: "col" }])
  col: TCol;

  @Column("bigint", { name: "Data-Type", nullable: true })
  dataType1: TRow;

  @ManyToOne(() => TRow, (tRow) => tRow.tCells)
  @JoinColumn([{ name: "Data-Type", referencedColumnName: "row" }])
  dataType: TRow;

  @Column("bigint", { name: "Row", nullable: false })
  row1: TRow;

  @ManyToOne(() => TRow, (tRow) => tRow.tCells2)
  @JoinColumn([{ name: "Row", referencedColumnName: "row" }])
  row: TRow;

  @Column("bigint", { name: "Items", nullable: true })
  items1:  TItem[];

  @OneToMany(() => TFormat, (tFormat) => tFormat.default)
  tFormats: TFormat[];

  itemDetails?: TItem[];

}
