import { environment } from 'src/environment/environment';
import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: environment.host,
    port: environment.port,
    username: environment.user,
    password: environment.password,
    database: environment.database,
    synchronize: false,
    bigNumberStrings: true,
    multipleStatements: true,
    logging: true,
    entities: [__dirname + '/../4_core/entities/*{.ts,.js}'],
    migrations: ['dist/db/migrations/*{.ts,.js}'],
    migrationsRun: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;