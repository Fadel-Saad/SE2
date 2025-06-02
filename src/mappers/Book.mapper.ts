import { BookBuilder, IdentifiableBookBuilder } from "../model/builders/book.builder";
import { Book, IdentifiableBook } from "../model/Book.model";
import { IMapper } from "./IMapper";

export class JSONBookMapper implements IMapper<{} | [], Book> {
    
    map(data: {} | []): Book {
        const objectValues = Object.values(data);
        console.log(objectValues);
        return BookBuilder.newBuilder()
                            .setOrderId(parseInt(objectValues[0]))
                            .setTitle(objectValues[1])
                            .setAuthor(objectValues[2])
                            .setGenre(objectValues[3])
                            .setFormat(objectValues[4])
                            .setLanguage(objectValues[5])
                            .setPublisher(objectValues[6])
                            .setSpecialEdition(objectValues[7])
                            .setPackaging(objectValues[8])
                            .build();
    }

    reverseMap(data: Book): {} | [] {
        return [
            data.getOrderId(),
            data.getTitle(),
            data.getAuthor(),
            data.getGenre(),
            data.getFormat(),
            data.getLanguage(),
            data.getPublisher(),
            data.getSpecialEdition(),
            data.getPackaging()
        ]
    }
}

export interface DBBook {
    id: string;
    orderId: number;
    title: string;
    author: string;
    genre: string;
    format: string;
    language: string;
    publisher: string;
    specialEdition: string;
    packaging: string;
}

export class PostgreSQLBookMapper implements IMapper<DBBook, IdentifiableBook> {
    
    map(data: DBBook): IdentifiableBook {
        return IdentifiableBookBuilder.newBuilder()
                    .setBook(BookBuilder.newBuilder()
                        .setOrderId(data.orderId)
                        .setTitle(data.title)
                        .setAuthor(data.author)
                        .setGenre(data.genre)
                        .setFormat(data.format)
                        .setLanguage(data.language)
                        .setPublisher(data.publisher)
                        .setSpecialEdition(data.specialEdition)
                        .setPackaging(data.packaging)
                        .build())
                    .setId(data.id)
                    .build();
    }

    reverseMap(data: IdentifiableBook): DBBook {
        return {
            id: data.getId(),
            orderId: data.getOrderId(),
            title: data.getTitle(),
            author: data.getAuthor(),
            genre: data.getGenre(),
            format: data.getFormat(),
            language: data.getLanguage(),
            publisher: data.getPublisher(),
            specialEdition: data.getSpecialEdition(),
            packaging: data.getPackaging()
        }
    }
}

export class SQLiteBookMapper implements IMapper<DBBook, IdentifiableBook> {
    
    map(data: DBBook): IdentifiableBook {
        return IdentifiableBookBuilder.newBuilder()
                    .setBook(BookBuilder.newBuilder()
                        .setOrderId(data.orderId)
                        .setTitle(data.title)
                        .setAuthor(data.author)
                        .setGenre(data.genre)
                        .setFormat(data.format)
                        .setLanguage(data.language)
                        .setPublisher(data.publisher)
                        .setSpecialEdition(data.specialEdition)
                        .setPackaging(data.packaging)
                        .build())
                    .setId(data.id)
                    .build();
    }

    reverseMap(data: IdentifiableBook): DBBook {
        return {
            id: data.getId(),
            orderId: data.getOrderId(),
            title: data.getTitle(),
            author: data.getAuthor(),
            genre: data.getGenre(),
            format: data.getFormat(),
            language: data.getLanguage(),
            publisher: data.getPublisher(),
            specialEdition: data.getSpecialEdition(),
            packaging: data.getPackaging()
        }
    }
}