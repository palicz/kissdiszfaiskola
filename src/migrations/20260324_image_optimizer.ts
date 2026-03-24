import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Incremental migration: @inoo-ch/payload-image-optimizer fields on `media` + job task enum values.
 *
 * Commit 2a63d57 added the plugin without a migration; dev used schema push, production needs this SQL.
 * Do not use `migrate:create` without a database connection — it generates a full snapshot and is unsafe here.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$ BEGIN
    CREATE TYPE "public"."enum_media_image_optimizer_status" AS ENUM('pending', 'processing', 'complete', 'error');
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    ALTER TYPE "public"."enum_payload_jobs_task_slug" ADD VALUE 'imageOptimizer_convertFormats';
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    ALTER TYPE "public"."enum_payload_jobs_task_slug" ADD VALUE 'imageOptimizer_regenerateDocument';
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    ALTER TYPE "public"."enum_payload_jobs_log_task_slug" ADD VALUE 'imageOptimizer_convertFormats';
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
    ALTER TYPE "public"."enum_payload_jobs_log_task_slug" ADD VALUE 'imageOptimizer_regenerateDocument';
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;

  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "image_optimizer_thumb_hash" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "image_optimizer_original_size" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "image_optimizer_optimized_size" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "image_optimizer_status" "enum_media_image_optimizer_status";
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "image_optimizer_error" varchar;

  CREATE TABLE IF NOT EXISTS "media_image_optimizer_variants" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "format" varchar,
    "filename" varchar,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "mime_type" varchar,
    "url" varchar
  );

  DO $$ BEGIN
    ALTER TABLE "media_image_optimizer_variants" ADD CONSTRAINT "media_image_optimizer_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;

  CREATE INDEX IF NOT EXISTS "media_image_optimizer_variants_order_idx" ON "media_image_optimizer_variants" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "media_image_optimizer_variants_parent_id_idx" ON "media_image_optimizer_variants" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "media_image_optimizer_variants" CASCADE;
  ALTER TABLE "media" DROP COLUMN IF EXISTS "image_optimizer_thumb_hash";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "image_optimizer_original_size";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "image_optimizer_optimized_size";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "image_optimizer_status";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "image_optimizer_error";
  DROP TYPE IF EXISTS "public"."enum_media_image_optimizer_status";
  `)
}
