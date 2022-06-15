import React, {FC, useEffect, useState} from 'react'
import {Layout, Row, Col, Modal, Typography, Select, Button, Input} from "antd";
import { CloseOutlined, HeartOutlined, HeartFilled, SearchOutlined } from '@ant-design/icons';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {BookCard} from '../components/BookCard';
import {IBook} from '../models/IBook';
import {MapComponent} from './MapComponent';

export const Books: FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentBook, setCurrentBook] = useState({} as IBook);
    const [searchText, setSearchText] = useState('');
    const [currentCoords, setCurrentCoords] = useState([55.76, 37.64] as number[])
    const {
        fetchBooks,
        filteredBooksByCategory,
        filteredBooksByGenre,
        resetFilters,
        favoriteBook,
        unfavoriteBook,
    } = useActions()
    const {filteredBooks, categories, genres} = useTypedSelector(state => state.book)
    const {Title, Text} = Typography
    const {Option} = Select
    useEffect(() => {
        fetchBooks();
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

    // @ts-ignore
    // @ts-ignore
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
                    <Input
                        placeholder="Поиск по названию..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={event => setSearchText(event.target.value)}
                        style={{marginLeft: 10}}
                    />
                </Col>
                <Col>
                    <Button
                        style={{marginLeft: 20}}
                        type="primary"
                        icon={<CloseOutlined />}
                        onClick={() => {
                            resetFilters()
                            setSearchText('')
                        }}
                    >
                        Сбросить
                    </Button>
                </Col>
            </Row>
            <Row justify={'center'}>
            {filteredBooks.filter(book => {
                if (searchText === '') {
                    return true;
                }
                if (book.title.includes(searchText)) {
                    return true;
                }
            }).map(
                book =>
                    <Col>
                        <BookCard
                            description={book.description}
                            title={book.title}
                            favorite={book.favorite}
                            src={book.image.includes('.') ? `/images/${book.image}` : '/images/2.jpg'}
                            key={book.slug}
                            onClick={() => {
                                setCurrentBook(book)
                                setCurrentCoords(
                                    book?.whereBuy?.split(';')[0].split(':')[1].split('-').map(coord => Number(coord))
                                )
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
                    onClick={() => {
                        if (currentBook.favorite) {
                            unfavoriteBook(currentBook);
                        } else
                            favoriteBook(currentBook);
                        handleOk();
                    }}
                >
                    {currentBook.favorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                </Button>
                <Title level={5}>Описание: {currentBook?.description}</Title>
                <Title level={5}>Год: {currentBook?.year}</Title>
                <Title level={5}>Автор: {currentBook?.author}</Title>
                <Title level={5}>Жанр: {currentBook?.genre}</Title>
                <Title level={5}>Категория: {currentBook?.category}</Title>
                <Title level={5}><a target={'_blank'} href={currentBook?.link}>Ссылка на книгу</a></Title>
                <Title level={5}>Где купить:</Title>
                {
                    currentBook?.whereBuy?.split(';').map(place => ({name: place.split(':')[0], coords: place.split(':')[1].split('-').map(coord => Number(coord))}))
                        .map(place => <p style={{cursor: 'pointer'}} onClick={() => setCurrentCoords(place.coords)}>{place.name}</p>)
                }
                <MapComponent
                    width={'470px'}
                    height={'200px'}
                    mapCoords={{
                        center: currentCoords,
                        zoom: 13,
                        controls: []
                    }}
                />
            </Modal>
        </Layout>
    )
}
