const process = require('process');
const username = process.env.MYSQL_DATABASE_USER || 'test';
const password = process.env.MYSQL_DATABASE_PASSWORD || 'test';
const db_host = process.env.MYSQL_DATABASE_HOST || 'localhost';
const db_port = +(process.env.MYSQL_DATABASE_PORT || 3306);
const db_name = process.env.MYSQL_DATABASE_NAME || 'testdb';
module.exports = {
  type: 'mysql',
  host: db_host,
  port: db_port,
  username,
  password,
  database: db_name,
  synchronize: false,
  dropSchema: false,
  logging: true,
  entities: [
    __dirname + '/src/**/*.entity.ts',
    __dirname + '/dist/**/*.entity.js',
  ],
  migrations: ['migrations/**/*.ts'],
  subscribers: ['subscriber/**/*.ts', 'dist/subscriber/**/.js'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'migrations',
    subscribersDir: 'subscriber',
  },
};
