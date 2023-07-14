import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const TypeormConfig = new DataSource({
  name: 'database',
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'postgres',
  password: 'dev',
  database: 'wallet',
  schema: 'public',
  entities: ['dist/**/*.model{.ts,.js}', 'src/**/*.model{.ts,.js}'],
  synchronize: true,
  migrationsRun: false,
  logging: true,
  logger: 'file',
  migrations: ['./dist/migrations/*.js'],
  ssl: false
})
