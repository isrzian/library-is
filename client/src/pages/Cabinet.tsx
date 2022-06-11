import React, {FC, useEffect, useState} from 'react';
import {Layout, Row, Col, Image, Typography} from 'antd';
import logo from '../components/images/1.png'
import UserService from '../api/UserService';
import {IUser} from '../models/IUser';

type PromiseUser = { user: IUser }

export const Cabinet: FC = () => {

    const [user, setUser] = useState({} as PromiseUser)
    const {Title} = Typography

    useEffect(() => {
        (async () => {
            const promise = await UserService.getCurrentUser()
            setUser(promise.data)
        })()
    }, [])

    return (
        <Layout>
        <Row justify={'center'} style={{marginTop: 40, height: 500}}>
            <Col span={6} offset={3}>
                <Image
                    width={200}
                    src={logo}
                />
            </Col>
            <Col span={6}>
                <Title level={2}>Имя: {user.user?.username}</Title>
                <Title level={2}>Почта: {user.user?.email}</Title>
                <Title level={2}>Биография: {user.user?.bio ? user.user?.bio : 'Не задана'}</Title>
                <Title level={2}>Любимые книги:</Title>
                {
                    user.user?.favorites.length ? <Title level={2}>{user.user?.favorites.join(', ')}</Title>
                        : 'Отсутствуют'
                }
            </Col>
        </Row>
        </Layout>
    )
}
