import {
    AddBookAction,
    AddBookToFavoriteAction,
    BookActionEnum,
    DeleteBookFromFavoritesAction,
    FilterCategoryBooksAction,
    FilterGenreBooksAction,
    ResetFiltersAction,
    SetBooksAction,
    SetCategoriesAction,
    SetGenresAction
} from "./types";
import {IBook} from "../../../models/IBook";
import {AppDispatch} from "../../index";
import BookService from '../../../api/BookService';
import UserService from '../../../api/UserService';

export const BookActionCreators = {
    setCategories: (payload: string[]): SetCategoriesAction => ({type: BookActionEnum.SET_CATEGORIES, payload}),
    setGenres: (payload: string[]): SetGenresAction => ({type: BookActionEnum.SET_GENRES, payload}),
    filteredBooksByCategory: (payload: string): FilterCategoryBooksAction => ({type: BookActionEnum.FILTER_CATEGORY_BOOKS, payload}),
    filteredBooksByGenre: (payload: string): FilterGenreBooksAction => ({type: BookActionEnum.FILTER_GENRE_BOOKS, payload}),
    resetFilters: (): ResetFiltersAction => ({type: BookActionEnum.RESET_FILTERS}),
    setBooks: (payload: IBook[]): SetBooksAction => ({type: BookActionEnum.SET_BOOKS, payload}),
    addBook: (payload: IBook): AddBookAction => ({type: BookActionEnum.CREATE_BOOK, payload}),
    addBookToFavorite: (payload: IBook): AddBookToFavoriteAction => ({type: BookActionEnum.ADD_BOOK_TO_FAVORITE, payload}),
    deleteBookFromFavorites: (payload: IBook): DeleteBookFromFavoritesAction => ({type: BookActionEnum.DELETE_BOOK_FROM_FAVORITES, payload}),
    createBook: (book: IBook) => async (dispatch: AppDispatch) => {
        try {
            const response = await BookService.createBook(book);
            dispatch(BookActionCreators.addBook(response.data))
        } catch (e) {
            console.log(e)
        }
    },
    fetchBooks: () => async (dispatch: AppDispatch) => {
        try {
            const responseBooks = await BookService.getAllBooks();
            const responseUserBook = await UserService.getCurrentUser();
            const favoritesUserBooks = responseUserBook.data.user.favorites.map((book: { slug: string; }) => book.slug);
            const books = responseBooks.data.map(book =>
                (favoritesUserBooks.includes(book.slug) ? {...book, favorite: true} : {...book, favorite: false}))
            dispatch(BookActionCreators.setBooks(books))
            const uniqueCategories = Array.from(new Set(responseBooks.data.map(book => book.category)))
            const uniqueGenres = Array.from(new Set(responseBooks.data.map(book => book.genre)))
            dispatch(BookActionCreators.setCategories(uniqueCategories))
            dispatch(BookActionCreators.setGenres(uniqueGenres))
        } catch (e) {
            console.log(e)
        }
    },

    favoriteBook: (book: IBook) => async (dispatch: AppDispatch) => {
        try {
            const response = await BookService.addBookToFavorite(book.slug)
            const favoriteBook = response.data;
            favoriteBook.favorite = true;
            dispatch(BookActionCreators.addBookToFavorite(favoriteBook))
        } catch (e) {
            console.log(e)
        }
    },

    unfavoriteBook: (book: IBook) => async (dispatch: AppDispatch) => {
        try {
            const response = await BookService.deleteBookFromFavorites(book.slug);
            const unfavoriteBook = response.data;
            unfavoriteBook.favorite = false;
            dispatch(BookActionCreators.deleteBookFromFavorites(unfavoriteBook));
        } catch (e) {
            console.log(e)
        }
    }
}
