import React, {FC} from 'react';
import {Typography} from 'antd';
import {IBook} from '../models/IBook';

export interface BookModalProps {
    book: IBook,
}

export const BookModal: FC<BookModalProps> = ({book}) => {
    const {Title, Text} = Typography

    return (
        <div>
            <Title>Книга ${book.title}</Title>
            <Text>Описание: {book.description}</Text>
            <Text>Год: {book.year}</Text>
            <Text>Автор: {book.author}</Text>
            <Text>Жанр: {book.genre}</Text>
            <Text>Категория: {book.category}</Text>
        </div>
    )
}
