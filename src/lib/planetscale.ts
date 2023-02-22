// import 'server-only' not working with API routes yet
import { Generated, Kysely } from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale'

/* 💡
CREATE TABLE daily_notes (
  id INT NOT NULL AUTO_INCREMENT,
  date DATE NOT NULL,
  content TEXT,
  position INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
 */
export interface DailyNote {
  id: Generated<number>
  date: Date
  content: string | null
  created_at: Generated<Date>
  updated_at: Generated<Date>
}
export interface CreateDailyNoteDTO {
  date: Date
  content: string
}

export interface UpdateDailyNoteDTO {
  date?: Date
  content?: string
}

/* 💡
CREATE TABLE categories (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
*/

export interface Category {
  id: Generated<number>
  name: string
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

/* 💡
CREATE TABLE category_notes (
  id INT NOT NULL AUTO_INCREMENT,
  category_id INT NOT NULL,
  date DATE NOT NULL,
  title VARCHAR(255),
  content TEXT,
  position INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
);
*/
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
