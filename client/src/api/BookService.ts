import axios, {AxiosResponse} from 'axios';
import {IBook} from '../models/IBook';

export default class BookService {
    static async getAllBooks(): Promise<AxiosResponse<IBook[]>> {
        return await axios.get('http://localhost:8000/books');
    }

    static async createBook(newBook: IBook) {
        return await axios.post('http://localhost:8000/books/book/create', newBook);
    }

    static async addBookToFavorite(slug: string) {
        return await axios.post(`http://localhost:8000/books/book/${slug}/favorite`, null);
    }
}
