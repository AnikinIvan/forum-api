#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/95033423c08b9adc10be6505c3d64c4f78547a7abae6d22a70e9f1b635b59e06/contract';
import endContract from '../../snapshots/95033423c08b9adc10be6505c3d64c4f78547a7abae6d22a70e9f1b635b59e06/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/eb51dc0bafc8af181e5e6fc29a7e61cd738ded069efd34ee59e468fd1a68e3b0/contract';
import startContract from '../../snapshots/eb51dc0bafc8af181e5e6fc29a7e61cd738ded069efd34ee59e468fd1a68e3b0/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  placeholder,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'Post', column: 'author' }),
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('hashPassword', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addColumn({
        schema: 'public',
        table: 'Post',
        column: col('authorId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.setNotNull({ schema: 'public', table: 'Post', column: 'authorId' }),
      this.setDefault({
        schema: 'public',
        table: 'Post',
        column: col('id', 'int4', {
          default: fn('autoincrement()'),
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Post',
        index: 'Post_authorId_idx_e47547ed',
        columns: ['authorId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Post',
        foreignKey: {
          name: 'Post_authorId_fkey',
          columns: ['authorId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
