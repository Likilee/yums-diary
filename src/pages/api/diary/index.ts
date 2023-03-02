import {
  createDailyNote,
  getAllNoteCountByDate,
  updateDailyNote,
  deleteDailyNote,
} from '@/lib/db'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
  regions: ['icn1', 'hnd1'], //	Seoul, South Korea	AWS ap-northeast-2 https://vercel.com/docs/concepts/edge-network/regions#region-list
}

export default async function handler(req: NextRequest) {
  try {
    switch (req.method) {
      case 'POST': {
        const body = await req.json()
        const data = await createDailyNote({
          date: new Date(body.date),
          content: body.content,
        })
        return new Response(JSON.stringify(data), { status: 201 })
      }
      case 'GET': {
        const data = await getAllNoteCountByDate()
        return new Response(JSON.stringify(data), { status: 200 })
      }
      case 'PUT': {
        const body = await req.json() // (data: {id: number, date?: Date, content?: string}
        const data = await updateDailyNote(body.data)
        return new Response(JSON.stringify(data), { status: 200 })
      }
      case 'DELETE': {
        const id = req.nextUrl.searchParams.get('id')
        if (!id) throw new Error('DELETE diary should have "id" query parameter')

        const data = await deleteDailyNote(+id)
        if (data === false) throw new Error('No matching diary id')
        return new Response(JSON.stringify(data), { status: 200 })
      }
    }
  } catch (e: any) {
    console.log(e)
    return new Response(JSON.stringify({ message: e.message }), { status: 500 })
  }
}
