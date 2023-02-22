import { queryBuilder, CreateDailyNoteDTO, UpdateDailyNoteDTO } from '@/lib/planetscale'

export const createDailyNote = async (data: CreateDailyNoteDTO) => {
  console.log('NEW', new Date())
  console.log('HREE', data.date)
  const result = await queryBuilder
    .insertInto('daily_note')
    .values({
      date: data.date,
      content: data.content,
    })
    .executeTakeFirstOrThrow()

  console.log('EMTPY?', data)
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
