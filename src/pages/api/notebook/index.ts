/* ๐ก
/api/notebook

- `POST /api/notebook` : ์๋ก์ด ๋ธํธ๋ถ์ ์์ฑํ๋ค.

- `GET /api/notebook` : ๋ชจ๋  ๋ธํธ๋ถ์ ๊ฐ์ ธ์จ๋ค.
- `GET /api/notebook/:id` : ์ผ์นํ๋ id์ ๋ธํธ๋ถ ๋ฐ์ดํฐ๋ฅผ ๊ฐ์ ธ์จ๋ค.
- `DELETE /api/notebook/:id` ์ผ์นํ๋ id์ ๋ธํธ๋ถ ๋ฐ์ดํฐ๋ฅผ ์ญ์ ํ๋ค.
- `PUT /api/notebook/:id` ์ผ์นํ๋ id์ ๋ธํธ๋ถ ๋ฐ์ดํฐ๋ฅผ ์๋ฐ์ดํธํ๋ค.  */

import { createNotebook, getAllNotebooks } from '@/lib/db'
import { NextRequest } from 'next/server'

export interface CreateNotebookDTO {
  parent_id: number | null // ๋ถ๋ชจ notebook์ id
  name: string
  position: number // float
}

export default async function handler(req: NextRequest) {
  try {
    switch (req.method) {
      case 'POST': {
        const body = await req.json()
        const data = await createNotebook(body.data)
        return new Response(JSON.stringify(data), { status: 201 })
      }
      case 'GET': {
        const data = await getAllNotebooks()
        return new Response(JSON.stringify(data), { status: 200 })
      }
    }
  } catch (e: any) {
    console.log(e)
    return new Response(JSON.stringify({ message: e.message }), { status: 500 })
  }
}
