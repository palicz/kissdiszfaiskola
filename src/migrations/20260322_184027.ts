import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Incremental migration: Kiss folder slideshow block only.
 *
 * The previous 20260322_184027 snapshot tried to CREATE the full schema from scratch,
 * which fails on production where objects already exist — so slideshow tables were never created.
 *
 * If you manually inserted a `payload_migrations` row for `20260322_184027` without running SQL,
 * delete it before deploy: DELETE FROM payload_migrations WHERE name = '20260322_184027';
 *
 * FK blocks also catch `undefined_table` so a fresh DB (e.g. CI) can run before `payload_folders` /
 * `pages` exist; Payload may add the same constraints on a later schema sync.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$ BEGIN
    CREATE TYPE "public"."enum_pages_blocks_kiss_folder_slideshow_transition" AS ENUM('crossfade', 'slide', 'fadeScale', 'instant');
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    CREATE TYPE "public"."enum__pages_v_blocks_kiss_folder_slideshow_transition" AS ENUM('crossfade', 'slide', 'fadeScale', 'instant');
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;

  CREATE TABLE IF NOT EXISTS "pages_blocks_kiss_folder_slideshow" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "title" varchar,
    "folder_id" integer,
    "transition" "enum_pages_blocks_kiss_folder_slideshow_transition" DEFAULT 'crossfade',
    "interval_ms" numeric DEFAULT 5000,
    "block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_kiss_folder_slideshow" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_path" text NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "eyebrow" varchar,
    "title" varchar,
    "folder_id" integer,
    "transition" "enum__pages_v_blocks_kiss_folder_slideshow_transition" DEFAULT 'crossfade',
    "interval_ms" numeric DEFAULT 5000,
    "_uuid" varchar,
    "block_name" varchar
  );

  DO $$ BEGIN
    ALTER TABLE "pages_blocks_kiss_folder_slideshow" ADD CONSTRAINT "pages_blocks_kiss_folder_slideshow_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN undefined_table THEN NULL;
  END $$;

  DO $$ BEGIN
    ALTER TABLE "pages_blocks_kiss_folder_slideshow" ADD CONSTRAINT "pages_blocks_kiss_folder_slideshow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN undefined_table THEN NULL;
  END $$;

  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_kiss_folder_slideshow" ADD CONSTRAINT "_pages_v_blocks_kiss_folder_slideshow_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN undefined_table THEN NULL;
  END $$;

  DO $$ BEGIN
    ALTER TABLE "_pages_v_blocks_kiss_folder_slideshow" ADD CONSTRAINT "_pages_v_blocks_kiss_folder_slideshow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN undefined_table THEN NULL;
  END $$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_kiss_folder_slideshow_order_idx" ON "pages_blocks_kiss_folder_slideshow" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_kiss_folder_slideshow_parent_id_idx" ON "pages_blocks_kiss_folder_slideshow" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_kiss_folder_slideshow_path_idx" ON "pages_blocks_kiss_folder_slideshow" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_kiss_folder_slideshow_folder_idx" ON "pages_blocks_kiss_folder_slideshow" USING btree ("folder_id");

  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_kiss_folder_slideshow_order_idx" ON "_pages_v_blocks_kiss_folder_slideshow" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_kiss_folder_slideshow_parent_id_idx" ON "_pages_v_blocks_kiss_folder_slideshow" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_kiss_folder_slideshow_path_idx" ON "_pages_v_blocks_kiss_folder_slideshow" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_kiss_folder_slideshow_folder_idx" ON "_pages_v_blocks_kiss_folder_slideshow" USING btree ("folder_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "pages_blocks_kiss_folder_slideshow" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_kiss_folder_slideshow" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_kiss_folder_slideshow_transition";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_kiss_folder_slideshow_transition";
  `)
}
