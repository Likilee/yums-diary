// import 'server-only' not working with API routes yet
import { Generated, Kysely } from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale'

export interface Diary {
  id: Generated<number>
  date: Date
  content: string | null
  created_at: Generated<Date>
  updated_at: Generated<Date>
}
export interface DiaryDto {
  id: number
  date: string
  content: string | null
  created_at: string
  updated_at?: string
}
export interface CreateDiaryDTO {
  date: Date
  content: string
}
export interface UpdateDiaryDTO {
  id: number
  date?: Date
  content?: string
}

export interface Notebook {
  id: Generated<number>
  parent_id: number | null // 부모 notebook의 id
  name: string
  position: number // float
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface Note {
  id: Generated<number>
  parent_id: number // 부모 notebook의 id
  date: Date
  title: string
  content: string
  position: number // float
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

interface Database {
  diary: Diary
  notebook: Notebook
  note: Note
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  }),
})
