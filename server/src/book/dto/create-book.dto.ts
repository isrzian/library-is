import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly genre: string;

    @IsNotEmpty()
    @IsString()
    readonly category: string;

    @IsNumber()
    readonly year: number;

    @IsString()
    readonly whereBuy: string;

    @IsNotEmpty()
    @IsString()
    readonly author: string;
}
