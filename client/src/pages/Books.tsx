import React, {FC, useEffect} from 'react'
import {Layout, Row, Col} from "antd";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {BookCard} from '../components/BookCard';
import logo from '../components/images/2.jpg'

export const Books: FC = () => {
    const {fetchBooks} = useActions()
    const {books} = useTypedSelector(state => state.book)

    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <Layout>
            <Row justify={'center'}>
            {books.map(
                book =>
                    <Col>
                        <BookCard
                            description={book.description}
                            title={book.title}
                            favorite={book.favorite}
                            src={logo}
                            key={book.slug}
                    />
                    </Col>
            )}
            </Row>
        </Layout>
    )
}
