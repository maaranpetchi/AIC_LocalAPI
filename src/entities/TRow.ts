import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TFormat } from "./TFormat";
import { TItem } from "./TItem";
import { TPg } from "./TPg";
import { TTx } from "./TTx";
import { TCell } from "./TCell";

@Index("Row_pkey", ["row"], { unique: true })
@Entity("t-Row", { schema: "public" })
export class TRow {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Row" })
  row: string;

  @Column("bigint", { name: "Row-Type", nullable: true })
  rowType: string | null;

  @Column("smallint", { name: "Row-Level" })
  rowLevel: number;

  @Column("bigint", { name: "Parent-Row", nullable: true })
  parentRow: string | null;

  @Column("bigint", { name: "Sibling-Row", nullable: true })
  siblingRow: string | null;

  @OneToMany(() => TFormat, (tFormat) => tFormat.rowSetTick)
  tFormats: TFormat[];

  @OneToMany(() => TFormat, (tFormat) => tFormat.unit)
  tFormats2: TFormat[];

  @OneToMany(() => TItem, (tItem) => tItem.stdUnit)
  tItems: TItem[];

  @OneToMany(() => TItem, (tItem) => tItem.unit)
  tItems2: TItem[];

  @ManyToOne(() => TPg, (tPg) => tPg.tRows)
  @JoinColumn([{ name: "PG", referencedColumnName: "pg" }])
  pg: TPg;

  @ManyToOne(() => TRow, (tRow) => tRow.tRows)
  @JoinColumn([{ name: "Share", referencedColumnName: "row" }])
  share: TRow;

  @OneToMany(() => TRow, (tRow) => tRow.share)
  tRows: TRow[];

  @OneToMany(() => TTx, (tTx) => tTx.txType)
  tTxes: TTx[];

  rowFormatDetails?: TFormat[];

  cells: TCell[];
}
