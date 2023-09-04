import XLSX from 'xlsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getWorkBook( data: any ): XLSX.WorkBook {
    return XLSX.read( data, { type: 'buffer' } );
}

function getDecodeRange( data: string ): XLSX.Range {
    return XLSX.utils.decode_range( data );
}

function parseSheetToJson( worksheet: XLSX.WorkSheet, options: XLSX.Sheet2JSONOpts ) {
    return XLSX.utils.sheet_to_json(
        worksheet, {
            blankrows: true,
            ...options,
        }
    );
}

export default { getWorkBook, getDecodeRange, parseSheetToJson };
