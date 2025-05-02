import { BookBuilder } from "../model/builders/book.builder";
import { Book } from "../model/Book.model";
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
                            .setPrice(parseInt(objectValues[9]))
                            .setQuantity(parseInt(objectValues[10]))
                            .build();
    }
}