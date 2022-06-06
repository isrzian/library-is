import React, {FC} from 'react';
import { Card, Avatar } from 'antd';
import {HeartOutlined, HeartFilled} from '@ant-design/icons'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface BookCardProps {
    src: string,
    favorite: boolean,
    description: string,
    title: string
}

export const BookCard: FC<BookCardProps> = ({src, favorite, description, title}) => (
    <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={src} />}
    >
        <Meta title={title} description={description} />
        {favorite ? <HeartFilled /> : <HeartOutlined />}
    </Card>
);
