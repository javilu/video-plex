import { Decimal128, ObjectId } from "mongodb";

export default interface Libro {
    _id: ObjectId;
    name: string;
    stock: number;
    price: Decimal128;
    description: string;
    author: string;
    image: string;
    categories: Array<string>;
    editorial: string;
    isbn: number;
    language: string;
    pages: number;
    publication: Date;
    opinion: string;
}