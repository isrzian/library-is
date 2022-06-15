import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import slugify from 'slugify';
import {getRepository, Repository} from 'typeorm';
import {BookEntity} from './book.entity';
import {CreateBookDto} from './dto/create-book.dto';
import {UserEntity} from '../user/user.entity';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {
    }

    async getAllBooks(): Promise<Array<BookEntity>> {
        const queryBuilder = getRepository(BookEntity).createQueryBuilder('books');
        return await queryBuilder.getMany();
    }

    async getBook(slug: string): Promise<BookEntity> {
        return await this.bookRepository.findOne({slug});
    }

    async createBook(createBookDto: CreateBookDto): Promise<BookEntity> {
        const bookByName = await this.bookRepository.findOne({
            title: createBookDto.title,
        });

        if (bookByName) {
            throw new HttpException(
                'A book with this title already exist!',
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        const newBook = new BookEntity();
        Object.assign(newBook, createBookDto);
        newBook.slug = this.getSlug(newBook.title);
        return await this.bookRepository.save(newBook);
    }

    async addBookToFavorites(
        currentUserId: number,
        slug: string
    ): Promise<BookEntity> {
        const book = await this.getBook(slug);
        const user = await this.userRepository.findOne(currentUserId, {
            relations: ['favorites'],
        })

        const isNotFavorited = user.favorites.findIndex(bookInFavorites => bookInFavorites.id === book.id) === -1;

        if (isNotFavorited) {
            user.favorites.push(book);
            await this.userRepository.save(user);
        }

        return book;
    }

    async deleteBookToFavorite(
        currentUserId: number,
        slug: string
    ) {
        const book = await this.getBook(slug);
        const user = await this.userRepository.findOne(currentUserId, {
            relations: ['favorites'],
        })

        const isFavoriteId = user.favorites.findIndex(bookInFavorites => bookInFavorites.id === book.id);

        if (isFavoriteId + 1) {
            user.favorites.splice(isFavoriteId, 1);
            await this.userRepository.save(user);
        }

        return book;
    }

    private getSlug(title: string): string {
        return (
            slugify(title, { lower: true }) +
            '-' +
            ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
        );
    }
}
