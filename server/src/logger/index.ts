import expressWinston from 'express-winston';
import { createLogger, transports, format } from 'winston';

const customFormat = format.printf( ( info ) => `[${ info.timestamp }] - [${ info.level.toLocaleUpperCase() }] - ${ info.message }` );
const customFormatTimestamp = format.timestamp( { format: 'HH:mm:ss DD-MM-YYYY' } );

const transportConsole = new transports.Console( {
    format: format.combine(
        format.json(),
        customFormatTimestamp,
        format.prettyPrint(),
    ),
} ) ;

const transportFileError = new transports.File( {
    level: 'error',
    filename: 'src/logs/errors.log',
    format: format.combine(
        format.json(),
        customFormatTimestamp,
        format.prettyPrint(),
    ),
} ) ;

const transportFileWarning = new transports.File( {
    level: 'warn',
    filename: 'src/logs/warnings.log',
    format: format.combine(
        format.json(),
        customFormatTimestamp,
        format.prettyPrint(),
    ),
} );

const routerLogger = expressWinston.logger( {
    transports: [
        transportConsole,
        transportFileWarning,
        transportFileError
    ],
    requestWhitelist: [ 'headers', 'query', 'body' ],
    responseWhitelist: [ 'body' ],
    statusLevels: true,
} );

const logger = createLogger( {
    transports: [
        transportConsole,
        transportFileWarning,
        transportFileError
    ],
} );

export { routerLogger, logger };



