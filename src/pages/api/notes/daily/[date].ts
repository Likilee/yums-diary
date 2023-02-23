import { createDailyNote, getAllNoteCountByDate, getDailyNotesByDate } from '@/lib/db'
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
// SELECT DATE_FORMAT(date, '%Y-%m-%dT%H:%i:%s.000Z') AS date, COUNT(*) AS note_count
// FROM daily_note
// GROUP BY date
// HAVING note_count > 0
// ORDER BY date ASC;
