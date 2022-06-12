import React, {FC, useEffect, useState} from 'react'
import {Layout, Row, Col, Modal, Typography, Select, Button} from "antd";
import { CloseOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {BookCard} from '../components/BookCard';
import logo from '../components/images/2.jpg'
import {IBook} from '../models/IBook';
import {MapComponent} from './MapComponent';

export const Books: FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentBook, setCurrentBook] = useState({} as IBook);
    const [categories, setCategories] = useState([] as string[])
    const [genres, setGenres] = useState([] as string[])
    const {
        fetchBooks,
        filteredBooksByCategory,
        filteredBooksByGenre,
        resetFilters,
        favoriteBook,
    } = useActions()
    const {books, filteredBooks} = useTypedSelector(state => state.book)
    const {Title, Text} = Typography
    const {Option} = Select

    useEffect(() => {
        fetchBooks();
        setCategories(Array.from(new Set(books?.map(book => book.category))));
        setGenres(Array.from(new Set(books?.map(book => book.genre))));
    }, [])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Layout>
            <Row style={{marginTop: 20}}>
                <Col>
                    <Text style={{marginLeft: 30}}>Фильтр по категориям</Text>
                    <Select
                        defaultValue={'Выберите категорию...'}
                        onChange={category => filteredBooksByCategory(category)}
                        style={{marginLeft: 10, width: 200}}
                    >
                        {categories.map(category => <Option value={category}>{category}</Option>)}
                    </Select>
                </Col>
                <Col>
                    <Text style={{marginLeft: 30}}>Фильтр по жанрам</Text>
                    <Select
                        defaultValue={'Выберите жанр...'}
                        onChange={genre => filteredBooksByGenre(genre)}
                        style={{marginLeft: 10, width: 200}}
                    >
                        {genres.map(genre => <Option value={genre}>{genre}</Option>)}
                    </Select>
                </Col>
                <Col>
                    <Button
                        style={{marginLeft: 20}}
                        type="primary"
                        icon={<CloseOutlined />}
                        onClick={resetFilters}
                    >
                        Сбросить
                    </Button>
                </Col>
            </Row>
            <Row justify={'center'}>
            {filteredBooks.map(
                book =>
                    <Col>
                        <BookCard
                            description={book.description}
                            title={book.title}
                            favorite={book.favorite}
                            src={logo}
                            key={book.slug}
                            onClick={() => {
                                setCurrentBook(book)
                                showModal()
                            }}
                    />
                    </Col>
            )}
            </Row>
            <Modal
                title={`Книга ${currentBook?.title}`}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Button
                    style={{marginBottom: 20}}
                    type="primary"
                    icon={currentBook.favorite ? <HeartFilled /> : <HeartOutlined />}
                    onClick={() => favoriteBook(currentBook)}
                >
                    Добавить в избранное
                </Button>
                <Title level={5}>Описание: {currentBook?.description}</Title>
                <Title level={5}>Год: {currentBook?.year}</Title>
                <Title level={5}>Автор: {currentBook?.author}</Title>
                <Title level={5}>Жанр: {currentBook?.genre}</Title>
                <Title level={5}>Категория: {currentBook?.category}</Title>
                <Title level={5}>Где купить:</Title>
                <MapComponent
                    width={'470px'}
                    height={'200px'}
                    mapCoords={{
                        center: currentBook?.whereBuy?.split(', ').map(coord => Number(coord)) ? currentBook?.whereBuy?.split(', ').map(coord => Number(coord)) : [13, 13],
                        zoom: 13,
                        controls: []
                    }}
                />
            </Modal>
        </Layout>
    )
}
