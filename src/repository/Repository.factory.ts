import { ItemCategory } from "../model/IItem";
import { Initializable, IRepository } from "./IRepository";
import { IIdentifiableOrderItem, IOrder } from "../model/IOrder";
import { OrderRepository as pgOrderRepository } from "./postgreSQL/Order.repository";
import { CakeRepository as pgCakeRepository } from "./postgreSQL/Cake.order.repository";
import { BookRepository as pgBookRepository} from "./postgreSQL/Book.order.repository";
import { ToyRepository as pgToyRepository } from "./postgreSQL/Toy.order.repository";
import { OrderRepository } from "./sqlite/Order.repository";
import { CakeRepository } from "./sqlite/Cake.order.repository";
import { BookRepository } from "./sqlite/Book.order.repository"
import { ToyRepository } from "./sqlite/Toy.order.repository"
import { CakeOrderRepository } from "./file/Cake.order.repository";


export enum DBMode {
    SQLITE,
    FILE,
    POSTGRESQL
}

export class RepositoryFactory {

    public static async create(mode: DBMode, category: ItemCategory): Promise <IRepository<IIdentifiableOrderItem>> {

        let repository: IRepository<IIdentifiableOrderItem> & Initializable;
        switch (mode) {
            case DBMode.POSTGRESQL:
                switch (category) {
                    case ItemCategory.CAKE:
                        repository = new pgOrderRepository(new pgCakeRepository());
                        break;

                    case ItemCategory.BOOK:
                        repository = new pgOrderRepository(new pgBookRepository());
                        break;

                    case ItemCategory.TOY:
                        repository = new pgOrderRepository(new pgToyRepository());
                        break;

                    default:
                        throw new Error("Unsupported category");
                }
                await repository.init();
                return repository;

            case DBMode.SQLITE:
                switch (category) {
                    case ItemCategory.CAKE:
                        repository = new OrderRepository(new CakeRepository());
                        break;

                    case ItemCategory.BOOK:
                        repository = new OrderRepository(new BookRepository());
                        break;

                    case ItemCategory.TOY:
                        repository = new OrderRepository(new ToyRepository());
                        break;
                        
                    default:
                        throw new Error("Unsupported category");
                    }
                await repository.init();
                return repository;

            case DBMode.FILE:
                throw new Error("File mode is deprecated");
            default:
                throw new Error("Unsupported DB mode");
        }
    }
}