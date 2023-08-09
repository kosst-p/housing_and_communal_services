export interface IUserBasic {
    name: string;
    email: string;
}

export interface IUserWithPassword extends IUserBasic {
    password: string;
    confirmPassword: string;
}
