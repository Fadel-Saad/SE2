import { IIdentifiableItem } from "../../model/IItem";
import { IIdentifiableOrderItem } from "../../model/IOrder";
import { IRepository, Initializable, id } from "../IRepository";
import { postgreConnectionManager } from "./postgreConnectionManager";
import logger from "../../util/logger";
import { DbException, InitializationException } from "../../util/exceptions/repositoryExceptions";
import { SQLiteOrder, SQLiteOrderMapper } from "../../mappers/Order.mapper";


const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS "order" (
        id TEXT PRIMARY KEY,
        quantity INTEGER NOT NULL,
        price INTEGER NOT NULL,
        item_category TEXT NOT NULL,
        item_id TEXT NOT NULL
        )`;

const INSERT_ORDER = `INSERT INTO "order" (id, quantity, price, item_category, item_id) VALUES ($1, $2, $3, $4, $5)`;

const SELECT_BY_ID = `SELECT * FROM "order" WHERE id = $1`;

const SELECT_ALL = `SELECT * FROM "order" WHERE item_category = $1`;

const DELETE_ID = `DELETE FROM "order" WHERE id = $1`;

const UPDATE_ID = `UPDATE "order" SET quantity = $1, price = $2, item_category = $3, item_id = $4 WHERE id = $5`;

export class OrderRepository implements IRepository<IIdentifiableOrderItem>, Initializable {
    constructor(private readonly itemRepository: IRepository<IIdentifiableItem> & Initializable) {}

    async init() {
        try {
            const conn = await postgreConnectionManager.getPostgreConnection();
            await conn.query(CREATE_TABLE);
            await this.itemRepository.init();
            logger.info("Order table initialized");
        } catch (error) {
            logger.error("Failed to initialize Order table", error as Error);
            throw new InitializationException("Failed to initialize Order table", error as Error);
        }
    }
    
    async create(order: IIdentifiableOrderItem): Promise<id> {
        let conn;
        try {
            conn = await postgreConnectionManager.getPostgreConnection();
            conn.query("BEGIN TRANSACTION");
            const item_id = await this.itemRepository.create(order.getItem());
            conn.query(INSERT_ORDER, [order.getId(),
                order.getQuantity(),
                order.getPrice(),
                order.getItem().getCategory(),
                item_id]);
            conn.query("COMMIT");
            return order.getId();
        } catch (error: unknown) {
            logger.error("Failed to create order", error as Error);
            await conn?.query("ROLLBACK");
            throw new DbException("Failed to create order", error as Error);
        }
    }

    async get(id: id): Promise<IIdentifiableOrderItem> {
        try {
            const conn = await postgreConnectionManager.getPostgreConnection();
            const result = await conn.query<SQLiteOrder>(SELECT_BY_ID, [id]);
            if (result.rows.length === 0) {
                logger.error("Order of id %s not found", id);
                throw new Error(`Order of id ${id} not found`);
            }
            const item = await this.itemRepository.get(result.rows[0].item_id);
            return new SQLiteOrderMapper().map({data: result.rows[0], item});
        } catch (error) {
            logger.error("Failed to get order of id %s %o", id, error as Error);
            throw new DbException("Failed to get order of id" + id, error as Error);
        }
    }

    async getAll(): Promise<IIdentifiableOrderItem[]> {
        try {
            const conn = await postgreConnectionManager.getPostgreConnection();
            const items = await this.itemRepository.getAll();
            if (items.length === 0) {
                return [];
            }
            const orders = await conn.query<SQLiteOrder>(SELECT_ALL, [items[0].getCategory()]);
            const bindedOrders = orders.rows.map((order) => {
                const item = items.find((item) => item.getId() === order.item_id);
                if (!item) {
                    throw new Error(`Item of id ${order.item_id} not found`);
                }
                return {order, item};
            });
            const mapper = new SQLiteOrderMapper();
            const identifiableOrders = bindedOrders.map(({order, item}) => {
                return mapper.map({data: order, item});
            });
            return identifiableOrders;
        } catch (error) {
            logger.error("Failed to get all orders");
            throw new DbException("Failed to get all orders", error as Error);
        }
    }

    async update(order: IIdentifiableOrderItem): Promise<void> {
        let conn;
        try {
            conn = await postgreConnectionManager.getPostgreConnection();
            conn.query("BEGIN TRANSACTION");
            await this.itemRepository.update(order.getItem());
            await conn.query(UPDATE_ID, [
                order.getQuantity(),
                order.getPrice(),
                order.getItem().getCategory(),
                order.getItem().getId(),
                order.getId()
            ]);
        } catch (error: unknown) {
            logger.error("Failed to update order of id %s %o", order.getId(), error as Error);
            conn?.query("ROLLBACK");
            throw new DbException("Failed to update order of id"+order.getId(), error as Error);
        }
    }

    async delete(id: id): Promise<void> {
        let conn;
        try {
            conn = await postgreConnectionManager.getPostgreConnection();
            conn.query("BEGIN TRANSACTION");
            await this.itemRepository.delete((await this.get(id)).getItem().getId());
            await conn.query(DELETE_ID, [id]);
            conn.query("COMMIT");
        } catch (error) {
            logger.error("Failed to delete order", error as Error);
            conn?.query("ROLLBACK");
            throw new DbException("Failed to delete order", error as Error);
        }
    }
}