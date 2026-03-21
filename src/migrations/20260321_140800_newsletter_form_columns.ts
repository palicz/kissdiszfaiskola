import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Adds Payload Form relationship + success copy to Kiss newsletter block tables.
 * Run: pnpm exec payload migrate
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_kiss_newsletter" ADD COLUMN IF NOT EXISTS "newsletter_form_id" integer;
  `)
  await db.execute(sql`
    ALTER TABLE "pages_blocks_kiss_newsletter" ADD COLUMN IF NOT EXISTS "success_message" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_kiss_newsletter" ADD COLUMN IF NOT EXISTS "newsletter_form_id" integer;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_kiss_newsletter" ADD COLUMN IF NOT EXISTS "success_message" varchar;
  `)

  await db.execute(sql.raw(`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_kiss_newsletter"
        ADD CONSTRAINT "pages_blocks_kiss_newsletter_newsletter_form_id_forms_id_fk"
        FOREIGN KEY ("newsletter_form_id") REFERENCES "public"."forms"("id")
        ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `))
  await db.execute(sql.raw(`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_kiss_newsletter"
        ADD CONSTRAINT "_pages_v_blocks_kiss_newsletter_newsletter_form_id_forms_id_fk"
        FOREIGN KEY ("newsletter_form_id") REFERENCES "public"."forms"("id")
        ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `))

  await db.execute(sql.raw(`
    CREATE INDEX IF NOT EXISTS "pages_blocks_kiss_newsletter_newsletter_form_idx"
      ON "pages_blocks_kiss_newsletter" USING btree ("newsletter_form_id");
  `))
  await db.execute(sql.raw(`
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_kiss_newsletter_newsletter_form_idx"
      ON "_pages_v_blocks_kiss_newsletter" USING btree ("newsletter_form_id");
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "pages_blocks_kiss_newsletter" DROP CONSTRAINT IF EXISTS "pages_blocks_kiss_newsletter_newsletter_form_id_forms_id_fk";
  `))
  await db.execute(sql.raw(`
    ALTER TABLE "_pages_v_blocks_kiss_newsletter" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_kiss_newsletter_newsletter_form_id_forms_id_fk";
  `))
  await db.execute(sql`
    ALTER TABLE "pages_blocks_kiss_newsletter" DROP COLUMN IF EXISTS "newsletter_form_id";
  `)
  await db.execute(sql`
    ALTER TABLE "pages_blocks_kiss_newsletter" DROP COLUMN IF EXISTS "success_message";
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_kiss_newsletter" DROP COLUMN IF EXISTS "newsletter_form_id";
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_kiss_newsletter" DROP COLUMN IF EXISTS "success_message";
  `)
}
