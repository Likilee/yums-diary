// import 'server-only' not working with API routes yet
import { Generated, Kysely } from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale'

export interface DailyNote {
  id: Generated<number>
  date: Date
  content: string | null
  created_at: Generated<Date>
  updated_at: Generated<Date>
}
export interface DailyNoteDto {
  id: number
  date: string
  content: string | null
  created_at: string
  updated_at?: string
}
export interface CreateDailyNoteDTO {
  date: Date
  content: string
}
export interface UpdateDailyNoteDTO {
  date?: Date
  content?: string
}

export interface Category {
  id: Generated<number>
  name: string
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface CategoryNote {
  id: Generated<number>
  category_id: number
  date: Date
  title: string
  content: string
  position: number
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

interface Database {
  daily_note: DailyNote
  category: Category
  category_note: CategoryNote
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  }),
})
