import { createDailyNote } from '@/lib/db'
import { CreateDailyNoteDTO, DailyNote } from '@/lib/planetscale'
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
        res.status(201).json(data)
      }
    }
  } catch (e: any) {
    console.log(e)
    return res.status(500).json({ message: e.message })
  }
}
