import { IIdentifiableItem, IItem, ItemCategory } from "../model/IItem";
import { IMapper } from "./IMapper";
import { IIdentifiableOrderItem, IOrder } from "../model/IOrder";
import { CSVCakeMapper, DBCake, PostgreSQLCakeMapper, SQLiteCakeMapper } from "./Cake.mapper";
import { DBBook, PostgreSQLBookMapper, SQLiteBookMapper } from "./Book.mapper";
import { DBToy, PostgreSQLToyMapper, SQLiteToyMapper } from "./Toy.mapper";
import { CSVOrderMapper } from "./Order.mapper";

export enum DBMode {
    SQLITE,
    FILE,
    POSTGRESQL
}


export class MapperFactory {

    public static create(mode: DBMode, category: ItemCategory): IMapper<any, any> {
        let mapper: IMapper<any, any>;

        switch (mode) {
            case DBMode.POSTGRESQL:
                switch (category) {
                    case ItemCategory.CAKE:
                        mapper = new PostgreSQLCakeMapper();
                        break;
                    case ItemCategory.BOOK:
                        mapper = new PostgreSQLBookMapper();
                        break;
                    case ItemCategory.TOY:
                        mapper = new PostgreSQLToyMapper();
                        break;
                    default:
                        throw new Error("Unsupported category");
                }
            return mapper;

            case DBMode.SQLITE:
                switch (category) {
                    case ItemCategory.CAKE:
                        mapper = new SQLiteCakeMapper();
                        break;
                    case ItemCategory.BOOK:
                        mapper = new SQLiteBookMapper();
                        break;
                    case ItemCategory.TOY:
                        mapper = new SQLiteToyMapper();
                        break;
                    default:
                        throw new Error("Unsupported category");
                }
            return mapper;

            case DBMode.FILE:
                switch (category) {
                    case ItemCategory.CAKE:
                        mapper = new CSVOrderMapper(new CSVCakeMapper());
                        break;
                    default:
                        throw new Error("Unsupported category");
                }
            return mapper;

            default:
                throw new Error("Unsupported DB mode");
        }
       
    }
}