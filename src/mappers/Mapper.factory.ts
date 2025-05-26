import { IIdentifiableItem, IItem, ItemCategory } from "../model/IItem";
import { IMapper } from "./IMapper";
import { IIdentifiableOrderItem, IOrder } from "../model/IOrder";
import { CSVCakeMapper, SQLiteCake, SQLiteCakeMapper } from "./Cake.mapper";
import { PostgreSQLBook, PostgreSQLBookMapper } from "./Book.mapper";
import { PostgreSQLToy, PostgreSQLToyMapper } from "./Toy.mapper";
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
                        mapper = new SQLiteCakeMapper();
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
                        mapper = new PostgreSQLBookMapper();
                        break;
                    case ItemCategory.TOY:
                        mapper = new PostgreSQLToyMapper();
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