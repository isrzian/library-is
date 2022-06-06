import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BookEntity} from './book.entity';
import {UserEntity} from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, UserEntity])],
  providers: [BookService],
  controllers: [BookController]
})
export class BookModule {}
