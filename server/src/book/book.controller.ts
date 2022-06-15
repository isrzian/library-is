import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {BookService} from './book.service';
import {BookEntity} from './book.entity';
import {CreateBookDto} from './dto/create-book.dto';
import {AuthGuard} from '../user/guards/auth.guard';
import {User} from '../user/decorators/user.decorator';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {
    }

    @Get()
    async getAllBooks(): Promise<Array<BookEntity>> {
        return await this.bookService.getAllBooks();
    }

    @Get('book/:slug')
    async getBook(@Param('slug') slug: string): Promise<BookEntity> {
        return this.bookService.getBook(slug);
    }

    @Post('book/create')
    @UseGuards(AuthGuard)
    async createBook(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
        return await this.bookService.createBook(createBookDto);
    }

    @Post('book/:slug/favorite')
    @UseGuards(AuthGuard)
    async addBookToFavorites(
        @User('id') currentUserId: number,
        @Param('slug') slug: string
    ): Promise<BookEntity> {
        return await this.bookService.addBookToFavorites(currentUserId, slug);
    }

    @Post('book/:slug/unfavorite')
    @UseGuards(AuthGuard)
    async deleteBookToFavorites(
        @User('id') currentUserId: number,
        @Param('slug') slug: string
    ): Promise<BookEntity> {
        return await this.bookService.deleteBookToFavorite(currentUserId, slug);
    }
}
