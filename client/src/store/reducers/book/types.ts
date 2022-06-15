import {IBook} from "../../../models/IBook";

export interface BookState {
    books: IBook[],
    filteredBooks: IBook[],
    categories: string[],
    genres: string[]
}

export enum BookActionEnum {
    SET_BOOKS = 'SET_BOOKS',
    CREATE_BOOK = 'CREATE_BOOK',
    ADD_BOOK_TO_FAVORITE = 'ADD_BOOK_TO_FAVORITE',
    DELETE_BOOK_FROM_FAVORITES = 'DELETE_BOOK_FROM_FAVORITES',
    FILTER_CATEGORY_BOOKS = 'FILTER_CATEGORY_BOOKS',
    FILTER_GENRE_BOOKS = 'FILTER_GENRE_BOOKS',
    RESET_FILTERS = 'RESET_FILTERS',
    SET_CATEGORIES = 'SET_CATEGORIES',
    SET_GENRES = 'SET_GENRES'
}

export interface SetCategoriesAction {
    type: BookActionEnum.SET_CATEGORIES,
    payload: string[]
}

export interface SetGenresAction {
    type: BookActionEnum.SET_GENRES,
    payload: string[]
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

export interface DeleteBookFromFavoritesAction {
    type: BookActionEnum.DELETE_BOOK_FROM_FAVORITES,
    payload: IBook
}

export type BookAction = SetBooksAction
    | AddBookAction
    | AddBookToFavoriteAction
    | DeleteBookFromFavoritesAction
    | FilterCategoryBooksAction
    | FilterGenreBooksAction
    | ResetFiltersAction
    | SetCategoriesAction
    | SetGenresAction
