import { Book, IdentifiableBook } from "../Book.model";
import logger from "../../util/logger";

export class BookBuilder {
    private orderId!: number;
    private title!: string;
    private author!: string;
    private genre!: string;
    private format!: string;
    private language!: string;
    private publisher!: string;
    private specialEdition!: string;
    private packaging!: string;

    public static newBuilder(): BookBuilder {
        return new BookBuilder();
    }

    setOrderId(orderId: number) :BookBuilder {
        this.orderId = orderId;
        return this;
    }

    setTitle(title: string) :BookBuilder {
        if(typeof title !== "string") {
            throw new Error("wrong data type for title");
        }
        this.title = title;
        return this;
    }

    setAuthor(author: string) :BookBuilder {
        if(typeof author !== "string") {
            throw new Error("wrong data type for author");
        }
        this.author = author;
        return this;
    }

    setGenre(genre: string) :BookBuilder {
        this.genre = genre;
        return this;
    }

    setFormat(format: string) :BookBuilder {
        this.format = format;
        return this;
    }

    setLanguage(language: string) :BookBuilder {
        this.language = language;
        return this;
    }

    setPublisher(publisher: string) :BookBuilder {
        this.publisher = publisher;
        return this;
    }

    setSpecialEdition(specialEdition: string) :BookBuilder {
        this.specialEdition = specialEdition;
        return this;
    }

    setPackaging(packaging: string) :BookBuilder {
        this.packaging = packaging;
        return this;
    }


    build(): Book {
        const requiredProperties = [
            this.orderId,
            this.title,
            this.author,
            this.genre,
            this.format,
            this.language,
            this.publisher,
            this.specialEdition,
            this.packaging,
        ];

        for (const property of requiredProperties) {
            if (property === undefined) {
                logger.error("Missing required properties, could not build a book");
                throw new Error("Missing required properties");
            }
        }

        return new Book(
            this.orderId,
            this.title,
            this.author,
            this.genre,
            this.format,
            this.language,
            this.publisher,
            this.specialEdition,
            this.packaging,
        );
    }
}

export class IdentifiableBookBuilder {
    private id!: string;
    private book!: Book;

    static newBuilder(): IdentifiableBookBuilder {
        return new IdentifiableBookBuilder();
    }
    
    setId(id: string): IdentifiableBookBuilder {
        this.id = id;
        return this;
    }

    setBook(book: Book): IdentifiableBookBuilder {
        this.book = book;
        return this;
    }

    build(): IdentifiableBook {
        if (!this.id || !this.book) {
            logger.error("Missing required properties, could not build an identifiable book");
            throw new Error("Missing required properties to build an identifiable book");
        }

        return new IdentifiableBook(
            this.id,
            this.book.getOrderId(),
            this.book.getTitle(),
            this.book.getAuthor(),
            this.book.getGenre(),
            this.book.getFormat(),
            this.book.getLanguage(),
            this.book.getPublisher(),
            this.book.getSpecialEdition(),
            this.book.getPackaging()
        );
    }
}