import { MapperFactory } from "../src/mappers/Mapper.factory";
import { DBMode } from "../src/mappers/Mapper.factory";
import { ItemCategory } from "../src/model/IItem";
import { PostgreSQLCakeMapper, SQLiteCakeMapper } from "../src/mappers/Cake.mapper";
import { PostgreSQLBookMapper, SQLiteBookMapper } from "../src/mappers/Book.mapper";
import { PostgreSQLToyMapper, SQLiteToyMapper } from "../src/mappers/Toy.mapper";
import { CSVOrderMapper } from "../src/mappers/Order.mapper";

describe("MapperFactory.create", () => {
    
    it("returns PostgreSQLCakeMapper for DBMode.POSTGRESQL and ItemCategory.CAKE", () => {
        const mapper = MapperFactory.create(DBMode.POSTGRESQL, ItemCategory.CAKE);
        expect(mapper).toBeInstanceOf(PostgreSQLCakeMapper);
    });

    it("returns PostgreSQLBookMapper for DBMode.POSTGRESQL and ItemCategory.BOOK", () => {
        const mapper = MapperFactory.create(DBMode.POSTGRESQL, ItemCategory.BOOK);
        expect(mapper).toBeInstanceOf(PostgreSQLBookMapper);
    });

    it("returns PostgreSQLToyMapper for DBMode.POSTGRESQL and ItemCategory.TOY", () => {
        const mapper = MapperFactory.create(DBMode.POSTGRESQL, ItemCategory.TOY);
        expect(mapper).toBeInstanceOf(PostgreSQLToyMapper);
    });

    it("returns SQLiteCakeMapper for DBMode.SQLITE and ItemCategory.CAKE", () => {
        const mapper = MapperFactory.create(DBMode.SQLITE, ItemCategory.CAKE);
        expect(mapper).toBeInstanceOf(SQLiteCakeMapper);
    });

    it("returns SQLiteBookMapper for DBMode.SQLITE and ItemCategory.BOOK", () => {
        const mapper = MapperFactory.create(DBMode.SQLITE, ItemCategory.BOOK);
        expect(mapper).toBeInstanceOf(SQLiteBookMapper);
    });

    it("returns SQLiteToyMapper for DBMode.SQLITE and ItemCategory.TOY", () => {
        const mapper = MapperFactory.create(DBMode.SQLITE, ItemCategory.TOY);
        expect(mapper).toBeInstanceOf(SQLiteToyMapper);
    });

    it("returns CSVOrderMapper for DBMode.FILE and ItemCategory.CAKE", () => {
        const mapper = MapperFactory.create(DBMode.FILE, ItemCategory.CAKE);
        expect(mapper).toBeInstanceOf(CSVOrderMapper);
    });

    it("throws error for unsupported category in DBMode.POSTGRESQL", () => {
        expect(() => MapperFactory.create(DBMode.POSTGRESQL, "UNKNOWN" as ItemCategory)).toThrow("Unsupported category");
    });

    it("throws error for unsupported DB mode", () => {
        expect(() => MapperFactory.create("UNSUPPORTED" as unknown as DBMode, ItemCategory.CAKE)).toThrow("Unsupported DB mode");
    });
});
