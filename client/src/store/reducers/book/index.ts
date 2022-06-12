import {BookAction, BookActionEnum, BookState} from "./types";

const initialState: BookState = {
    books: [],
    filteredBooks: []
}

export default function BookReducer(state = initialState, action: BookAction): BookState {
    switch (action.type) {
        case BookActionEnum.SET_BOOKS:
            return {...state, books: action.payload, filteredBooks: action.payload}
        case BookActionEnum.CREATE_BOOK:
            const books = [...state.books, action.payload];
            return {...state, books, filteredBooks: books}
        case BookActionEnum.ADD_BOOK_TO_FAVORITE:
            const newBooks = state.books.map(book => (book.slug === action.payload.slug ? {...book, favorite: true} : book))
            return {...state, books: newBooks, filteredBooks: newBooks}
        case BookActionEnum.FILTER_CATEGORY_BOOKS:
            return {...state, filteredBooks: state.books.filter(book => book.category === action.payload)}
        case BookActionEnum.FILTER_GENRE_BOOKS:
            return {...state, filteredBooks: state.books.filter(book => book.genre === action.payload)}
        case BookActionEnum.RESET_FILTERS:
            return {...state, filteredBooks: state.books}
        default:
            return state
    }
}
