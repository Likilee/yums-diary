import { getDailyNotesByDate } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET': {
        const { date } = req.query
        const data = await getDailyNotesByDate(date as string)
        res.status(200).json(data)
      }
    }
  } catch (e: any) {
    console.log(e)
    return res.status(500).json({ message: e.message })
  }
}
