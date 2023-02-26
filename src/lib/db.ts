import { queryBuilder, CreateDailyNoteDTO, UpdateDailyNoteDTO } from '@/lib/planetscale'
import { sql } from 'kysely'

const OFFSET_HOUR = 9 // UTC+9 seoul

export const createDailyNote = async (data: CreateDailyNoteDTO) => {
  const result = await queryBuilder
    .insertInto('daily_note')
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
    .selectFrom('daily_note')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst()
  return result ? result : null
}

export const updateDailyNote = async (id: number, data: UpdateDailyNoteDTO) => {
  await queryBuilder
    .updateTable('daily_note')
    .set({
      date: data.date,
      content: data.content,
    })
    .where('id', '=', id)
    .executeTakeFirst()
  return getDailyNoteById(+id)
}

export const deleteDailyNote = async (id: number) => {
  const result = await queryBuilder
    .deleteFrom('daily_note')
    .where('id', '=', id)
    .executeTakeFirst()
  return result.numDeletedRows > 0
}

// 이후 stream 도 알아보자
export const getAllDailyNotes = async () => {
  const result = await queryBuilder
    .selectFrom('daily_note')
    .selectAll()
    .orderBy('date', 'desc')
    .execute()

  return result
}

export const getDailyNotesByDate = async (date: string) => {
  const result = await queryBuilder
    .selectFrom('daily_note')
    .selectAll()
    .where(sql`date(date_add(date, interval ${OFFSET_HOUR} hour))`, '=', date)
    .orderBy('updated_at', 'desc')
    .execute()
  return result
}

export const getAllNoteCountByDate = async () => {
  const { count } = queryBuilder.fn
  const result = await queryBuilder
    .selectFrom('daily_note')
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

/*
SELECT
		DATE(FROM_UNIXTIME(date)) AS ,
    COUNT(*) AS note_count
  FROM daily_note
  GROUP BY date
  HAVING note_count > 0
  ORDER BY date ASC;

  */
