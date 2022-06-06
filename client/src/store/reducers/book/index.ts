import {BookAction, BookActionEnum, BookState} from "./types";

const initialState: BookState = {
    books: []
}

export default function BookReducer(state = initialState, action: BookAction): BookState {
    switch (action.type) {
        case BookActionEnum.SET_BOOKS:
            return {...state, books: action.payload}
        case BookActionEnum.CREATE_BOOK:
            return {...state, books: [...state.books, action.payload]}
        case BookActionEnum.ADD_BOOK_TO_FAVORITE:
            const newBooks = state.books.map(book => (book.slug === action.payload.slug ? {...book, favorite: true} : book))
            return {...state, books: newBooks}
        default:
            return state
    }
}
