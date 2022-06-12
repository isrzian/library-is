import {IBook} from "../../../models/IBook";

export interface BookState {
    books: IBook[],
    filteredBooks: IBook[]
}

export enum BookActionEnum {
    SET_BOOKS = 'SET_BOOKS',
    CREATE_BOOK = 'CREATE_BOOK',
    ADD_BOOK_TO_FAVORITE = 'ADD_BOOK_TO_FAVORITE',
    FILTER_CATEGORY_BOOKS = 'FILTER_CATEGORY_BOOKS',
    FILTER_GENRE_BOOKS = 'FILTER_GENRE_BOOKS',
    RESET_FILTERS = 'RESET_FILTERS'
}

export interface ResetFiltersAction {
    type: BookActionEnum.RESET_FILTERS
}

export interface FilterCategoryBooksAction {
    type: BookActionEnum.FILTER_CATEGORY_BOOKS,
    payload: string
}

export interface FilterGenreBooksAction {
    type: BookActionEnum.FILTER_GENRE_BOOKS,
    payload: string
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

export type BookAction = SetBooksAction
    | AddBookAction
    | AddBookToFavoriteAction
    | FilterCategoryBooksAction
    | FilterGenreBooksAction
    | ResetFiltersAction
