import { getDailyNotesByDate } from '@/lib/db'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
  regions: ['icn1', 'hnd1'], //	Seoul, South Korea	AWS ap-northeast-2 https://vercel.com/docs/concepts/edge-network/regions#region-list
}

export default async function handler(req: NextRequest) {
  try {
    switch (req.method) {
      case 'GET': {
        const date = req.nextUrl.searchParams.get('date')
        const data = await getDailyNotesByDate(date as string)
        return new Response(JSON.stringify(data), { status: 200 })
      }
    }
  } catch (e: any) {
    console.log(e)
    return new Response(JSON.stringify({ message: e.message }), { status: 500 })
  }
}
