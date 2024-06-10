import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TCell } from "./TCell";
import { TFormat } from "./TFormat";
import { TItem } from "./TItem";
import { TPg } from "./TPg";
import { TTx } from "./TTx";
import { TUser } from "./TUser";

@Index("Row_pkey", ["row"], { unique: true })
@Entity("t-Row", { schema: "public" })
export class TRow {
  @PrimaryGeneratedColumn({ type: "bigint", name: "Row" })
  row: string;

  @Column("smallint", { name: "Row-Level" })
  rowLevel: number;

  @OneToMany(() => TCell, (tCell) => tCell.dataType)
  tCells: TCell[];

  @OneToMany(() => TCell, (tCell) => tCell.row)
  tCells2: TCell[];

  @OneToMany(() => TFormat, (tFormat) => tFormat.deleted)
  tFormats: TFormat[];

  @OneToMany(() => TFormat, (tFormat) => tFormat.objectType)
  tFormats2: TFormat[];

  @OneToMany(() => TFormat, (tFormat) => tFormat.rowSetTick)
  tFormats3: TFormat[];

  @OneToMany(() => TFormat, (tFormat) => tFormat.unit)
  tFormats4: TFormat[];

  @OneToMany(() => TItem, (tItem) => tItem.dataType)
  tItems: TItem[];

  @OneToMany(() => TItem, (tItem) => tItem.stdUnit)
  tItems2: TItem[];

  @OneToMany(() => TItem, (tItem) => tItem.unit)
  tItems3: TItem[];

  @Column("bigint", { name: "PG", nullable: true })
  pg1: TPg;

  @ManyToOne(() => TPg, (tPg) => tPg.tRows)
  @JoinColumn([{ name: "PG", referencedColumnName: "pg" }])
  pg: TPg;

  @Column("bigint", { name: "Parent-Row", nullable: true })
  parentRow1: TRow;

  @ManyToOne(() => TRow, (tRow) => tRow.tRows)
  @JoinColumn([{ name: "Parent-Row", referencedColumnName: "row" }])
  parentRow: TRow;

  @OneToMany(() => TRow, (tRow) => tRow.parentRow)
  tRows: TRow[];

  @Column("bigint", { name: "Row-Type", nullable: true })//added
  rowType1: TRow;

  @ManyToOne(() => TRow, (tRow) => tRow.tRows2)
  @JoinColumn([{ name: "Row-Type", referencedColumnName: "row" }])
  rowType: TRow;

  @OneToMany(() => TRow, (tRow) => tRow.rowType)
  tRows2: TRow[];

  @Column("bigint", { name: "Share", nullable: true })//added
  share1: TRow;

  @ManyToOne(() => TRow, (tRow) => tRow.tRows3)
  @JoinColumn([{ name: "Share", referencedColumnName: "row" }])
  share: TRow;

  @OneToMany(() => TRow, (tRow) => tRow.share)
  tRows3: TRow[];

  @Column("bigint", { name: "Sibling-Row", nullable: true })//added
  siblingRow1: TRow;

  @ManyToOne(() => TRow, (tRow) => tRow.tRows4)
  @JoinColumn([{ name: "Sibling-Row", referencedColumnName: "row" }])
  siblingRow: TRow;

  @OneToMany(() => TRow, (tRow) => tRow.siblingRow)
  tRows4: TRow[];

  @OneToMany(() => TTx, (tTx) => tTx.txType)
  tTxes: TTx[];

  @OneToMany(() => TUser, (tUser) => tUser.userType)
  tUsers: TUser[];

  @OneToMany(() => TUser, (tUser) => tUser.userType2)
  tUsers2: TUser[];
}
