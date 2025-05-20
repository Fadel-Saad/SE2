import { IIdentifiableItem, IItem, ItemCategory } from "./IItem";
import { id } from "repository/IRepository";


export class Book implements IItem {
    private orderId: number;
    private title: string;
    private author: string;
    private genre: string;
    private format: string;
    private language: string;
    private publisher: string;
    private specialEdition: string;
    private packaging: string;

    constructor (
        orderId: number,
        title: string,
        author: string,
        genre: string,
        format: string,
        language: string,
        publisher: string,
        specialEdition: string,
        packaging: string,
    ) {
        this.orderId = orderId,
        this.title = title,
        this.author = author,
        this.genre = genre,
        this.format = format,
        this.language = language,
        this.publisher = publisher,
        this.specialEdition = specialEdition,
        this.packaging = packaging
    }

    getCategory(): ItemCategory {
        return ItemCategory.BOOK;
    }

    getOrderId(): number {
        return this.orderId;
    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }

    getGenre(): string {
        return this.genre;
    }

    getFormat(): string {
        return this.format;
    }

    getLanguage(): string {
        return this.language;
    }

    getPublisher(): string {
        return this.publisher;
    }

    getSpecialEdition(): string {
        return this.specialEdition;
    }

    getPackaging(): string {
        return this.packaging;
    }
}

export class IdentifiableBook extends Book implements IIdentifiableItem {

    constructor(
        private id: id,
        orderId: number,
        title: string,
        author: string,
        genre: string,
        format: string,
        language: string,
        publisher: string,
        specialEdition: string,
        packaging: string,
    ) {
        super(
            orderId,
            title,
            author,
            genre,
            format,
            language,
            publisher,
            specialEdition,
            packaging
        );
    }

    getId(): id {
        return this.id;
    }
    
}