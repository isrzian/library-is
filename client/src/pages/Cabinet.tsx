import React, {FC, useEffect, useState} from 'react';
import {Layout, Row, Col, Image, Typography, Tabs, Button, Modal} from 'antd';
import UserService from '../api/UserService';
import {IUser} from '../models/IUser';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {BookCard} from '../components/BookCard';
import {IBook} from '../models/IBook';
import {HeartFilled, HeartOutlined} from '@ant-design/icons';
import {MapComponent} from './MapComponent';
import {useActions} from '../hooks/useActions';

type PromiseUser = { user: IUser }

export const Cabinet: FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentBook, setCurrentBook] = useState({} as IBook);
    const [user, setUser] = useState({} as PromiseUser)
    const {favoriteBook, unfavoriteBook} = useActions()
    const [currentCoords, setCurrentCoords] = useState([55.76, 37.64] as number[])
    const {books} = useTypedSelector(state => state.book)
    const {Title} = Typography
    const {TabPane} = Tabs

    useEffect(() => {
        (async () => {
            const promise = await UserService.getCurrentUser()
            setUser(promise.data)
        })()
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
            <Row justify={'center'} style={{ height: 500}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Личная информация" key="1">
                        <Row justify={'space-between'}>
                            <Col span={3} offset={3}>
                                <Image
                                    width={200}
                                    src={'/images/1.png'}
                                />
                            </Col>
                            <Col span={9}>
                                <Title level={4}>Имя: {user.user?.username}</Title>
                                <Title level={4}>Почта: {user.user?.email}</Title>
                                <Title level={4}>Биография: {user.user?.bio ? user.user?.bio : 'Не задана'}</Title>
                            </Col>
                            </Row>
                    </TabPane>
                    <TabPane tab="Любимые книги" key="2">
                        <Row justify={'space-between'}>
                        {
                            books.filter(book => book.favorite).length ?
                                books.filter(book => book.favorite).map(book =>
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
                                ) : 'Отсутствуют'
                        }
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
                    </TabPane>
                </Tabs>
            </Row>
        </Layout>
    )
}
