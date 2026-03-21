import * as migration_20260321_140800_newsletter_form_columns from './20260321_140800_newsletter_form_columns'

export const migrations = [
  {
    up: migration_20260321_140800_newsletter_form_columns.up,
    down: migration_20260321_140800_newsletter_form_columns.down,
    name: '20260321_140800_newsletter_form_columns',
  },
]
