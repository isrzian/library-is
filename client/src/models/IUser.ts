import {IBook} from './IBook';

export interface IUser {
    id: number,
    username: string,
    password: string,
    bio: string,
    image: string,
    email: string,
    token: string,
    favorites: IBook[]
}
