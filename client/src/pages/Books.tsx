import React, {FC, useState, useEffect} from 'react'
import {Layout, Row, Button, Modal} from "antd";
import {BookForm} from "../components/BookForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import { IBook } from '../models/IBook';
import {BookCard} from '../components/BookCard';
import logo from '../components/images/1.png'

const path = require('path')

export const Books: FC = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const {createBook, fetchBooks} = useActions()
    const {books} = useTypedSelector(state => state.book)
    const {user} = useTypedSelector(state => state.auth)

    useEffect(() => {
        fetchBooks()
    }, [])
    console.log(path.resolve(__dirname, '../../public/1.png'))
    return (
        <Layout>
            {books.map(
                book =>
                    <BookCard
                        description={book.description}
                        title={book.title}
                        favorite={book.favorite}
                        src={logo}
                        key={book.slug}
                    />
            )}
        </Layout>
    )
}
