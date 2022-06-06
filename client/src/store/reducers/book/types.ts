import {IBook} from "../../../models/IBook";

export interface BookState {
    books: IBook[]
}

export enum BookActionEnum {
    SET_BOOKS = 'SET_BOOKS',
    CREATE_BOOK = 'CREATE_BOOK',
    ADD_BOOK_TO_FAVORITE = 'ADD_BOOK_TO_FAVORITE'
}

export interface SetBooksAction {
    type: BookActionEnum.SET_BOOKS,
    payload: IBook[]
}

export interface AddBookAction {
    type: BookActionEnum.CREATE_BOOK,
    payload: IBook
}

export interface AddBookToFavoriteAction {
    type: BookActionEnum.ADD_BOOK_TO_FAVORITE,
    payload: IBook
}

export type BookAction = SetBooksAction | AddBookAction | AddBookToFavoriteAction
