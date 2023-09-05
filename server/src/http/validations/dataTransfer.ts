import { Request, Response, NextFunction } from '@http/types/index';
import { ImportFileError } from '@/errors';

export function validateImport( request: Request, _response: Response, next: NextFunction ): void {
    const { file } = request;

    if ( ! file?.buffer ) {
        throw new ImportFileError( 'Data import error.' );
    }

    const fileMaxAllowedSize = 1 * 1024 * 1024; // 1MB

    if ( file.size > fileMaxAllowedSize ) {
        throw new ImportFileError( 'The file is too large.' );
    }

    const fileAllowedTypes = [ 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ];

    if ( ! fileAllowedTypes.includes( file.mimetype ) ) {
        throw new ImportFileError( 'The file has wrong format.' );
    }

    next();
}
