/* 💡
/api/notebook

- `POST /api/notebook` : 새로운 노트북을 생성한다.

- `GET /api/notebook` : 모든 노트북을 가져온다.
- `GET /api/notebook/:id` : 일치하는 id의 노트북 데이터를 가져온다.
- `DELETE /api/notebook/:id` 일치하는 id의 노트북 데이터를 삭제한다.
- `PUT /api/notebook/:id` 일치하는 id의 노트북 데이터를 업데이트한다.  */

import { createNotebook, getAllNotebooks } from '@/lib/db'
import { NextRequest } from 'next/server'

export interface CreateNotebookDTO {
  parent_id: number | null // 부모 notebook의 id
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
