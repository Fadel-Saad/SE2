import { RepositoryFactory, DBMode } from "../src/repository/Repository.factory";
import { ItemCategory } from "../src/model/IItem";
import { OrderRepository as pgOrderRepository } from "../src/repository/postgreSQL/Order.repository";
import { OrderRepository as sqliteOrderRepository } from "../src/repository/sqlite/Order.repository";
import { CSVOrderMapper } from "../src/mappers/Order.mapper";
import { connectionManager } from "../src/repository/postgreSQL/connectionManager";
import { OrderRepository } from "../src/repository/file/Order.repository";

describe("MapperFactory.create", () => {

    afterAll( async () => {
        // close database connections
        await connectionManager.closeConnection();
    });
    
    it("returns Cake dbOrder for DBMode.POSTGRESQL and ItemCategory.CAKE", async () => {
        const repository = await RepositoryFactory.create(DBMode.POSTGRESQL, ItemCategory.CAKE);
        expect(repository).toBeInstanceOf(pgOrderRepository);
    });

    it("returns Book dbOrder for DBMode.POSTGRESQL and ItemCategory.BOOK", async () => {
        const repository = await RepositoryFactory.create(DBMode.POSTGRESQL, ItemCategory.BOOK);
        expect(repository).toBeInstanceOf(pgOrderRepository);
    });

    it("returns Toy dbOrder for DBMode.POSTGRESQL and ItemCategory.TOY", async () => {
        const repository = await RepositoryFactory.create(DBMode.POSTGRESQL, ItemCategory.TOY);
        expect(repository).toBeInstanceOf(pgOrderRepository);
    });

    it("returns Cake dbOrder for DBMode.SQLITE and ItemCategory.CAKE", async () => {
        const repository = await RepositoryFactory.create(DBMode.SQLITE, ItemCategory.CAKE);
        expect(repository).toBeInstanceOf(sqliteOrderRepository);
    });

    it("returns Book dbOrder for DBMode.SQLITE and ItemCategory.BOOK", async () => {
        const repository = await RepositoryFactory.create(DBMode.SQLITE, ItemCategory.BOOK);
        expect(repository).toBeInstanceOf(sqliteOrderRepository);
    });

    it("returns Toy dbOrder for DBMode.SQLITE and ItemCategory.TOY", async () => {
        const repository = await RepositoryFactory.create(DBMode.SQLITE, ItemCategory.TOY);
        expect(repository).toBeInstanceOf(sqliteOrderRepository);
    });

    it("returns cake order for DBMode.FILE and ItemCategory.CAKE", async () => {
        const repository = await RepositoryFactory.create(DBMode.FILE, ItemCategory.CAKE);
        expect(repository).toBeInstanceOf(OrderRepository);
    });

    it("throws error for unsupported category in DBMode.POSTGRESQL", async () => {
        await expect(RepositoryFactory.create(DBMode.POSTGRESQL, "UNKNOWN" as ItemCategory))
            .rejects.toThrow("Unsupported category");
    });

    it("throws error for unsupported DB mode", async () => {
        await expect(RepositoryFactory.create("UNSUPPORTED" as unknown as DBMode, ItemCategory.CAKE))
            .rejects.toThrow("Unsupported DB mode");
    });
});