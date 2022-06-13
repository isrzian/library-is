import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'books'})
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    slug: string;

    @Column()
    author: string;

    @Column()
    genre: string;

    @Column()
    category: string;

    @Column()
    year: number;

    @Column()
    whereBuy: string;

    @Column()
    link: string;

    @Column()
    image: string;
}
