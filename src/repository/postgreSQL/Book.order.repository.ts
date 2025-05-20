import { id, Initializable, IRepository } from "../../repository/IRepository";
import { ItemCategory } from "../../model/IItem";
import { IdentifiableBook } from "../../model/Book.model";
import { postgreConnectionManager } from "./postgreConnectionManager";
import { DbException, InitializationException, ItemNotFoundException } from "../../util/exceptions/repositoryExceptions";
import logger from "../../util/logger";
import { PostgreSQLBook, PostgreSQLBookMapper } from "../../mappers/Book.mapper";

const tableName = ItemCategory.BOOK;
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${tableName} (
    id TEXT PRIMARY KEY,
    "orderId" INTEGER NOT NULL,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT NOT NULL,
    format TEXT NOT NULL,
    language TEXT NOT NULL,
    publisher TEXT NOT NULL,
    "specialEdition" TEXT NOT NULL,
    packaging TEXT NOT NULL
    )`;

const INSERT_BOOK = `INSERT INTO ${tableName} (
    id, "orderId", title, author, genre, format, language, publisher,
    "specialEdition", packaging
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;

const SELECT_BY_ID = `SELECT * FROM ${tableName} WHERE id = $1`;

const SELECT_ALL = `SELECT * FROM ${tableName}`;

const DELETE_ID = `DELETE FROM ${tableName} WHERE id = $1`;

const UPDATE_ID = `UPDATE ${tableName} SET
    "orderId" = $1, title = $2, author = $3, genre = $4, format = $5, language = $6,
    publisher = $7, "specialEdition" = $8, packaging = $9 WHERE id = $10`;

export class BookRepository implements IRepository<IdentifiableBook>, Initializable {

    async init(): Promise<void> {
        try {
            const conn = await postgreConnectionManager.getPostgreConnection();
            await conn.query(CREATE_TABLE);
            logger.info("Book table initialized");
        } catch (error) {
            logger.error("Failed to initialize Book table", error as Error);
            throw new InitializationException("Failed to initialize Book table", error as Error);
        }
    }

    async create(item: IdentifiableBook): Promise<id> {
        try {
            const conn = await postgreConnectionManager.getPostgreConnection();
            await conn.query(INSERT_BOOK, [
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
            const conn = await postgreConnectionManager.getPostgreConnection();
            const result = await conn.query(SELECT_BY_ID, [id]);
            if (result.rows.length === 0) {
                throw new ItemNotFoundException(`Book of id ${id} not found`);
            }
            return new PostgreSQLBookMapper().map(result.rows[0]);
        } catch (error) {
            logger.error("Failed to get book of id %s %o", id, error as Error);
            throw new DbException("Failed to get book of id" + id, error as Error);
        }
    }

    async getAll(): Promise<IdentifiableBook[]> {
        try {
            const conn = await postgreConnectionManager.getPostgreConnection();
            const result = await conn.query<PostgreSQLBook>(SELECT_ALL);
            const mapper = new PostgreSQLBookMapper();
            return result.rows.map((cake) => mapper.map(cake));
        } catch (error) {
            logger.error("Failed to get all books");
            throw new DbException("Failed to get all books", error as Error);
        }
    }

    async update(item: IdentifiableBook): Promise<void> {
        try {
            const conn = await postgreConnectionManager.getPostgreConnection();
            await conn.query(UPDATE_ID, [
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
            const conn = await postgreConnectionManager.getPostgreConnection();
            await conn.query(DELETE_ID, [id]);
        } catch (error) {
            logger.error("Failed to delete book of id %s %o", id, error as Error);
            throw new DbException("Failed to delete book of id" + id, error as Error);
        }
    }
    
}