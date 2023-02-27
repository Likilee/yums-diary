import { createDailyNote, getAllNoteCountByDate, updateDailyNote } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST': {
        const body = JSON.parse(req.body)

        const data = await createDailyNote({
          date: new Date(body.date),
          content: body.content,
        })
        return res.status(201).json(data)
      }
      case 'GET': {
        const data = await getAllNoteCountByDate()
        return res.status(200).json(data)
      }
      case 'PUT': {
        const body = JSON.parse(req.body) // (data: {id: number, date?: Date, content?: string}
        const data = await updateDailyNote(body.data)
        return res.status(200).json(data)
      }
    }
  } catch (e: any) {
    console.log(e)
    return res.status(500).json({ message: e.message })
  }
}
