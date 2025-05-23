import { ItemCategory } from "../../model/IItem";
import { IdentifiableToy } from "../../model/Toy.model";
import { id, Initializable, IRepository } from "../../repository/IRepository";
import { postgreConnectionManager } from "./postgreConnectionManager";
import logger from "../../util/logger";
import { DbException, InitializationException, ItemNotFoundException } from "../../util/exceptions/repositoryExceptions";
import { PostgreSQLToy, PostgreSQLToyMapper } from "../../mappers/Toy.mapper";

const tableName = ItemCategory.TOY;
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${tableName} (
    id TEXT PRIMARY KEY,
    "orderId" INTEGER NOT NULL,
    type TEXT NOT NULL,
    "ageGroup" TEXT NOT NULL,
    brand TEXT NOT NULL,
    material TEXT NOT NULL,
    "batteryRequired" BOOLEAN NOT NULL,
    educational BOOLEAN NOT NULL
    )`;

const INSERT_TOY = `INSERT INTO ${tableName} (
    id, "orderId", type, "ageGroup", brand, material, "batteryRequired", educational)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

const SELECT_BY_ID = `SELECT * FROM ${tableName} WHERE id = $1`;

const SELECT_ALL = `SELECT * FROM ${tableName}`;

const DELETE_ID = `DELETE FROM ${tableName} WHERE id = $1`;

const UPDATE_ID = `UPDATE ${tableName} SET
    "orderId" = $1, type = $2, "ageGroup" = $3, brand = $4, material = $5,
    "batteryRequired" = $6, educational = $7 WHERE id = $8`;

export class ToyRepository implements IRepository<IdentifiableToy>, Initializable {

    async init(): Promise<void> {
        try {
            const conn = await postgreConnectionManager.getPostgreConnection();
            await conn.query(CREATE_TABLE);
            logger.info("Toy table initialized");
        } catch (error) {
            logger.error("Failed to initialize Toy table", error as Error);
            throw new InitializationException("Failed to initialize Toy table", error as Error);
        }
    }

    async create(item: IdentifiableToy): Promise<id> {
        try {
            const conn = await postgreConnectionManager.getPostgreConnection();
            await conn.query(INSERT_TOY, [
                item.getId(),
                item.getOrderId(),
                item.getType(),
                item.getAgeGroup(),
                item.getBrand(),
                item.getMaterial(),
                item.getBatteryRequired(),
                item.getEducational()
            ]);
            return item.getId();
        } catch (error) {
            logger.error("Failed to create toy", error as Error);
            throw new DbException("Failed to create toy", error as Error);
        }
    }

    async get(id: id): Promise<IdentifiableToy> {
        try {
            const conn = await postgreConnectionManager.getPostgreConnection();
            const result = await conn.query(SELECT_BY_ID, [id]);
            if (result.rows.length === 0) {
                throw new ItemNotFoundException(`Toy of id ${id} not found`);
            }
            return new PostgreSQLToyMapper().map(result.rows[0]);
        } catch (error) {
            logger.error("Failed to get toy of id %s %o", id, error as Error);
            throw new DbException("Failed to get toy of id" + id, error as Error);
        }
    }

    async getAll(): Promise<IdentifiableToy[]> {
        try {
            const conn = await postgreConnectionManager.getPostgreConnection();
            const result = await conn.query<PostgreSQLToy>(SELECT_ALL);
            const mapper = new PostgreSQLToyMapper();
            return result.rows.map((row: any) => mapper.map(row));
        } catch (error) {
            logger.error("Failed to get all toys");
            throw new DbException("Failed to get all toys", error as Error);
        }
    }

    async update(item: IdentifiableToy): Promise<void> {
        try {
            const conn = await postgreConnectionManager.getPostgreConnection();
            await conn.query(UPDATE_ID, [
                item.getOrderId(),
                item.getType(),
                item.getAgeGroup(),
                item.getBrand(),
                item.getMaterial(),
                item.getBatteryRequired(),
                item.getEducational(),
                item.getId()
            ]);
        } catch (error) {
            logger.error("Failed to update toy of id %s %o", item.getId(), error as Error);
            throw new DbException("Failed to update toy of id" + item.getId(), error as Error);
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