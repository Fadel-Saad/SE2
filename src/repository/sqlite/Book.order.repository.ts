import { IdentifiableBook } from "../../model/Book.model";
import { id, Initializable, IRepository } from "../IRepository";
import { DbException, InitializationException, ItemNotFoundException } from "../../util/exceptions/repositoryExceptions";
import logger from "../../util/logger";
import { ConnectionManager } from "./ConnectionManager";
import { ItemCategory } from "../../model/IItem";
import { PostgreSQLBook, PostgreSQLBookMapper } from "../../mappers/Book.mapper";
import { DBMode, MapperFactory } from "../../mappers/Mapper.factory";

const tableName = ItemCategory.BOOK;
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${tableName} (
    id TEXT PRIMARY KEY,
    orderId INTEGER NOT NULL,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT NOT NULL,
    format TEXT NOT NULL,
    language TEXT NOT NULL,
    publisher TEXT NOT NULL,
    specialEdition TEXT NOT NULL,
    packaging TEXT NOT NULL
    )`;

const INSERT_BOOK = `INSERT INTO ${tableName} (
    id, orderId, title, author, genre, format, language, publisher,
    specialEdition, packaging
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const SELECT_BY_ID = `SELECT * FROM ${tableName} WHERE id = ?`;

const SELECT_ALL = `SELECT * FROM ${tableName}`;

const DELETE_ID = `DELETE FROM ${tableName} WHERE id = ?`;

const UPDATE_ID = `UPDATE ${tableName} SET
    orderId = ?, title = ?, author = ?, genre = ?, format = ?, language = ?,
    publisher = ?, specialEdition = ?, packaging = ? WHERE id = ?`;

export class BookRepository implements IRepository<IdentifiableBook>, Initializable {

    async init(): Promise<void> {
        try {
            const conn = await ConnectionManager.getConnection();
            await conn.exec(CREATE_TABLE);
            logger.info("Book table initialized");
        } catch (error) {
            logger.error("Failed to initialize Book table", error as Error);
            throw new InitializationException("Failed to initialize Book table", error as Error);
        }
    }

    async create(item: IdentifiableBook): Promise<id> {
        try {
            const conn = await ConnectionManager.getConnection();
            await conn.run(INSERT_BOOK, [
                item.getId(),
                item.getOrderId(),
                item.getTitle(),
                item.getAuthor(),
                item.getGenre(),
                item.getFormat(),
                item.getLanguage(),
                item.getPublisher(),
                item.getSpecialEdition(),
                item.getPackaging()
            ]);
            return item.getId();
        } catch (error: unknown) {
            logger.error("Failed to create book", error as Error);
            throw new DbException("Failed to create book", error as Error);
        }
    }

    async get(id: id): Promise<IdentifiableBook> {
        try {
            const conn = await ConnectionManager.getConnection();
            const result = await conn.get<PostgreSQLBook>(SELECT_BY_ID, id);
            if (!result) {
                throw new ItemNotFoundException(`Book of id ${id} not found`);
            }
            return new PostgreSQLBookMapper().map(result);
        } catch (error) {
            logger.error("Failed to get book of id %s %o", id, error as Error);
            throw new DbException("Failed to get book of id" + id, error as Error);
        }
    }

    async getAll(): Promise<IdentifiableBook[]> {
        try {
            const conn = await ConnectionManager.getConnection();
            const result = await conn.all<PostgreSQLBook[]>(SELECT_ALL);
            const mapper = MapperFactory.create(DBMode.SQLITE, ItemCategory.BOOK);
            return result.map((book) => mapper.map(book));
        } catch (error) {
            logger.error("Failed to get all books");
            throw new DbException("Failed to get all books", error as Error);
        }
    }

    async update(item: IdentifiableBook): Promise<void> {
        try {
            const conn = await ConnectionManager.getConnection();
            await conn.run(UPDATE_ID, [
                item.getOrderId(),
                item.getTitle(),
                item.getAuthor(),
                item.getGenre(),
                item.getFormat(),
                item.getLanguage(),
                item.getPublisher(),
                item.getSpecialEdition(),
                item.getPackaging(),
                item.getId()
            ]);
        } catch (error) {
            logger.error("Failed to update book of id %s %o", item.getId(), error as Error);
            throw new DbException("Failed to update book of id" + item.getId(), error as Error);
        }
    }

    async delete(id: id): Promise<void> {
        try {
            const conn = await ConnectionManager.getConnection();
            await conn.run(DELETE_ID, id);
        } catch (error) {
            logger.error("Failed to delete book of id %s %o", id, error as Error);
            throw new DbException("Failed to delete book of id" + id, error as Error);
        }
    }
    
}