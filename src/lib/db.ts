import { queryBuilder, CreateDiaryDTO, UpdateDiaryDTO, Notebook } from '@/lib/planetscale'
import { CreateNotebookDTO } from '@/pages/api/notebook'
import { sql } from 'kysely'

const OFFSET_HOUR = 9 // UTC+9 seoul

export const createDailyNote = async (data: CreateDiaryDTO) => {
  const result = await queryBuilder
    .insertInto('diary')
    .values({
      date: data.date,
      content: data.content,
    })
    .executeTakeFirstOrThrow()

  const id = result.insertId

  return id ? getDailyNoteById(Number(id)) : null
}

export const getDailyNoteById = async (id: number) => {
  const result = await queryBuilder
    .selectFrom('diary')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst()
  return result ? result : null
}

export const updateDailyNote = async (data: UpdateDiaryDTO) => {
  await queryBuilder
    .updateTable('diary')
    .set({
      date: data.date ? new Date(data.date) : undefined,
      content: data.content,
    })
    .where('id', '=', data.id)
    .executeTakeFirst()
  return getDailyNoteById(+data.id)
}

export const deleteDailyNote = async (id: number) => {
  const result = await queryBuilder.deleteFrom('diary').where('id', '=', id).executeTakeFirst()
  return result.numDeletedRows > 0
}

// 이후 stream 도 알아보자
export const getAllDailyNotes = async () => {
  const result = await queryBuilder
    .selectFrom('diary')
    .selectAll()
    .orderBy('date', 'desc')
    .execute()

  return result
}

export const getDailyNotesByDate = async (date: string) => {
  const result = await queryBuilder
    .selectFrom('diary')
    .selectAll()
    .where(sql`date(date_add(date, interval ${OFFSET_HOUR} hour))`, '=', date)
    .orderBy('date', 'desc')
    .execute()
  return result
}

export const getAllNoteCountByDate = async () => {
  const { count } = queryBuilder.fn
  const result = await queryBuilder
    .selectFrom('diary')
    .select([
      sql`date(date_add(date, interval ${OFFSET_HOUR} hour))`.as('date'),
      count('id').as('note_count'),
    ])
    .groupBy(sql`date(date_add(date, interval ${OFFSET_HOUR} hour))`)
    .having(count('id'), '>', 0)
    .orderBy('date', 'desc')
    .execute()

  return result
}

/* 💡 Notebook db */
export async function createNotebook(data: CreateNotebookDTO) {
  const result = await queryBuilder
    .insertInto('notebook')
    .values({
      name: data.name,
      position: data.position,
      parent_id: data.parent_id,
    })
    .executeTakeFirstOrThrow()

  const id = result.insertId

  return id ? getNotebookById(Number(id)) : null
}

export async function getNotebookById(id: number) {
  const result = await queryBuilder
    .selectFrom('notebook')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst()
  return result ? result : null
}

// 이후 stream 도 알아보자
export async function getAllNotebooks() {
  const result = await queryBuilder
    .selectFrom('notebook')
    .selectAll()
    .orderBy('position', 'desc')
    .execute()

  return result
}
