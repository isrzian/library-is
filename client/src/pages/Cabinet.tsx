import React, {FC, useEffect, useState} from 'react';
import * as path from 'path';
import {Layout, Row, Col, Image, Typography, Tabs} from 'antd';
import logo from '../components/images/1.png'
import logoBook from '../components/images/2.jpg'
import UserService from '../api/UserService';
import {IUser} from '../models/IUser';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {BookCard} from '../components/BookCard';

type PromiseUser = { user: IUser }

export const Cabinet: FC = () => {

    const [user, setUser] = useState({} as PromiseUser)
    const {books} = useTypedSelector(state => state.book)
    const {Title} = Typography
    const {TabPane} = Tabs

    useEffect(() => {
        (async () => {
            const promise = await UserService.getCurrentUser()
            setUser(promise.data)
        })()
    }, [])

    return (
        <Layout>
            <Row justify={'center'} style={{ height: 500}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Личная информация" key="1">
                        <Row justify={'space-between'}>
                            <Col span={3} offset={3}>
                                <Image
                                    width={200}
                                    src={logo}
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
                                        src={book.image.includes('.') ? path.resolve('../components/images/', `${book.image}`) : logoBook}
                                        key={book.slug}
                                    />
                                ) : 'Отсутствуют'
                        }
                        </Row>
                    </TabPane>
                </Tabs>
            </Row>
        </Layout>
    )
}
