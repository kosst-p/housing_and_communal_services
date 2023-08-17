export default class BaseAdapter {
    static #defaultSortParam = '_id';
    static #defaultSearchParam = '';
    static #defaultPageParam = 1;
    static #defaultCountParam = 10;
    static #defaultMaxCountParam = 500;

    static getSortQueryParam( param: string ) {
        return param?.split( ',' ).join( ' ' ) || this.#defaultSortParam;
    }

    static getSearchQueryParam( param: string ) {
        return param || this.#defaultSearchParam;
    }

    static getPageQueryParam( param: string ) {
        return parseInt( param ) || this.#defaultPageParam;
    }

    static getCountQueryParam( param: string ) {
        const count = parseInt( param ) || this.#defaultCountParam;

        return count < this.#defaultMaxCountParam ? count : this.#defaultMaxCountParam;
    }
}
