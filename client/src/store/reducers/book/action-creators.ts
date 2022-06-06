import {AddBookAction, AddBookToFavoriteAction, BookActionEnum, SetBooksAction} from "./types";
import {IBook} from "../../../models/IBook";
import {AppDispatch} from "../../index";
import BookService from '../../../api/BookService';
import UserService from '../../../api/UserService';

export const BookActionCreators = {
    setBooks: (payload: IBook[]): SetBooksAction => ({type: BookActionEnum.SET_BOOKS, payload}),
    addBook: (payload: IBook): AddBookAction => ({type: BookActionEnum.CREATE_BOOK, payload}),
    addBookToFavorite: (payload: IBook): AddBookToFavoriteAction => ({type: BookActionEnum.ADD_BOOK_TO_FAVORITE, payload}),
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
            console.log('books')
            dispatch(BookActionCreators.setBooks(books))
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
    }
}