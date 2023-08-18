import { IRequestGet } from '../../types/locations';
import { TSortOrderValue, ISortParam } from './types';

export default class BaseAdapter {
    protected static defaultSortParam: ISortParam = {
        _id: 'asc'
    };
    protected static defaultSearchParam = '';
    protected static defaultPageParam = '1';
    protected static defaultCountParam = '10';
    protected static defaultMaxCountParam = 500;

    static getSortQueryParam( request: IRequestGet ): ISortParam {
        const { sort } = request.query;
        const sortQueries = sort?.split( '|' );

        if ( ! sortQueries?.length ) {
            return this.defaultSortParam;
        }

        const result: ISortParam = {} ;

        if ( sortQueries?.length ) {
            for ( const queries of sortQueries ) {
                if ( queries ) {
                    const sortQuery = queries.split( ',' );

                    result[ sortQuery[ 0 ] ] = sortQuery[ 1 ] as TSortOrderValue;
                }
            }
        }

        return result;
    }

    static getSearchQueryParam( request: IRequestGet ): string {
        const { search } = request.query;

        return search || this.defaultSearchParam;
    }

    static getPageQueryParam( request: IRequestGet ): number {
        const { page = this.defaultPageParam } = request.query;

        return parseInt( page );
    }

    static getCountQueryParam( request: IRequestGet ): number {
        const { count = this.defaultCountParam } = request.query;
        const parsedCount = parseInt( count );

        return parsedCount < this.defaultMaxCountParam ? parsedCount : this.defaultMaxCountParam;

    }
}
