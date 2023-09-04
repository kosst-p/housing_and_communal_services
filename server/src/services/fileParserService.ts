import XLSX from 'xlsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getWorkBook( data: any, options: XLSX.ParsingOptions | undefined ): XLSX.WorkBook {
    return XLSX.read( data, options );
}

function getDecodeRange( data: string ): XLSX.Range {
    return XLSX.utils.decode_range( data );
}

function parseSheetToJson<T = unknown[]>( worksheet: XLSX.WorkSheet, options: XLSX.Sheet2JSONOpts | undefined ): T {
    return XLSX.utils.sheet_to_json(
        worksheet, {
            blankrows: true,
            ...options,
        }
    ) as T;
}

export default { getWorkBook, getDecodeRange, parseSheetToJson };
