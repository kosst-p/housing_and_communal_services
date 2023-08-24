import mongoose, { Model, Schema, SchemaDefinition } from 'mongoose';
import { IDBConfig } from './types';

export default class DBService {
    #userName;
    #password;
    #hostName;
    #port;

    constructor( config: IDBConfig ) {
        this.#userName = config.userName;
        this.#password = config.password;
        this.#hostName = config.hostName;
        this.#port = config.port;
    }

    async init() {
        await mongoose.connect( `mongodb://${ this.#userName }:${ this.#password }@${ this.#hostName }:${ this.#port }/?authMechanism=DEFAULT` );
    }

    static getSchema<T>( template: SchemaDefinition ): Schema<T> {
        return new Schema<T>( template );
    }

    // static getSchema<T>( template: SchemaDefinition, options?: SchemaOptions ): Schema<T> {
    //     return new Schema<T>( template, options );
    // }

    static getModel<T, U = Model<T>>( name: string, schema: Schema<T> ): U {
        return mongoose.model<T, U>( name, schema );
    }
}
