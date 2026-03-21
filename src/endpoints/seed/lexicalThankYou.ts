import type { Form } from '@/payload-types'

/** Minimal Lexical editor state for form confirmation rich text (plugin-form-builder). */
export function lexicalThankYou(text: string): NonNullable<Form['confirmationMessage']> {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          textFormat: 0,
          textStyle: '',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              version: 1,
            },
          ],
        },
      ],
    },
  } as NonNullable<Form['confirmationMessage']>
}
