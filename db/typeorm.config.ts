import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config(); // Load .env file
const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 3307),
  username: configService.get<string>('DB_USERNAME', 'root'), // Ensure DB_USER is used
  password: configService.get<string>('DB_PASSWORD', '123456'),
  database: configService.get<string>('DB_DATABASE_NAME', 'honahouseshop'),
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  synchronize: configService.get<string>('NODE_ENV') === 'development',
  logging: configService.get<string>('NODE_ENV') === 'development',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
});

console.log('DB_USERNAME:', configService.get('DB_USERNAME'));
console.log('DB_HOST:', configService.get('DB_HOST'));
