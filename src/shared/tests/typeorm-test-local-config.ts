import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const TypeormTestLocalConfig = new DataSource({
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'dev',
  database: 'yara_pcd',
  schema: 'public',
  dropSchema: true,
  entities: ['dist/**/*.model{.ts,.js}', 'src/**/*.model{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  logging: true,
  logger: 'file',
  migrations: ['./dist/migrations/*.js'],
  ssl: false
})
