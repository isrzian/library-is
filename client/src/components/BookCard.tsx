import React, {FC} from 'react';
import { Card } from 'antd';
import {HeartOutlined, HeartFilled} from '@ant-design/icons'

const { Meta } = Card;

interface BookCardProps {
    src: string,
    favorite: boolean,
    description: string,
    title: string,
    onClick?: () => void
}

export const BookCard: FC<BookCardProps> = ({src, favorite, description, title, onClick}) => (
    <Card
        hoverable
        style={{ width: 240, marginLeft: 40, marginBottom: 20, marginTop: 20 }}
        cover={<img alt="example" src={src} />}
        onClick={onClick}
    >
        <Meta title={title} description={description} />
        {favorite ? <HeartFilled /> : <HeartOutlined />}
    </Card>
);
