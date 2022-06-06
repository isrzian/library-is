import React, {FC, useState} from "react";
import {rules} from "../utils/rules";
import {Button, Form, Input, Row, Select} from "antd";
import {IUser} from "../models/IUser";
import {IBook} from "../models/IBook";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface EventFormProps {
    submit: (event: IBook) => void
}

export const BookForm: FC<EventFormProps> = (props) => {
    const [book, setBook] = useState<IBook>({
        author: '',
        description: '',
        title: '',
        category: '',
        genre: '',
        slug: '',
        whereBuy: '',
        year: 2000,
    } as IBook)

    const {user} = useTypedSelector(state => state.auth)

    const submitForm = () => {
        props.submit({...book, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Books description"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    value={book.description}
                    onChange={e => setBook({...book, description: e.target.value})}
                />
            </Form.Item>
            <Form.Item
                label="Guest"
                name="guest"
                rules={[rules.required()]}
            >
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    )
}
