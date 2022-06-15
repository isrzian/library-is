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
        const token = localStorage.getItem('Token')
        return await axios.post(`http://localhost:8000/books/book/${slug}/favorite`, null, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
    }

    static async deleteBookFromFavorites(slug: string) {
        const token = localStorage.getItem('Token')
        return await axios.post(`http://localhost:8000/books/book/${slug}/unfavorite`, null, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
    }
}
