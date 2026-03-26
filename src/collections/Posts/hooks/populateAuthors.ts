import type { CollectionAfterReadHook } from 'payload'
import type { User } from '@/payload-types'

export const populateAuthors: CollectionAfterReadHook = async ({ doc, req }) => {
  if (doc?.authors && doc?.authors?.length > 0) {
    const authorDocs: User[] = []

    for (const author of doc.authors) {
      try {
        const authorDoc = await req.payload.findByID({
          id: typeof author === 'object' ? author?.id : author,
          collection: 'users',
          depth: 0,
          req,
        })

        if (authorDoc) {
          authorDocs.push(authorDoc)
        }
      } catch {
        // swallow error
      }
    }

    if (authorDocs.length > 0) {
      doc.populatedAuthors = authorDocs.map((authorDoc) => ({
        id: authorDoc.id,
        name: authorDoc.name,
      }))
    }
  }

  return doc
}
