import { Model } from "mongoose";

export interface IUser {
    firstName: string,
    lastName : string,
    email:string,
    password : string,
    role : 'USER'| 'ADMIN' | 'SUPPER ADMIN',
    address?: {
        city: string,
        street: string,
        zipcode: number
    },
    phoneNumber?: number
}

export interface IUserMethods {
    isPasswordMatched(plainTextPassword: string): Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;
