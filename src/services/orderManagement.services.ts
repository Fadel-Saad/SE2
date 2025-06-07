import { ServiceException } from "../util/exceptions/ServiceException";
import { RepositoryFactory } from "repository/Repository.factory";
import config from "../config";
import { IIdentifiableOrderItem } from "../model/IOrder";
import { ItemCategory } from "../model/IItem";
import { IRepository } from "../repository/IRepository";

export class OrderManagementService {
    
    // create an order
    public async createOrder(order: IIdentifiableOrderItem): Promise<IIdentifiableOrderItem> {
        // validation
        this.validateOrder(order);

        // persist the new order
        const repo = await this.getRepo(order.getItem().getCategory());
        await repo.create(order);
        return order;
    }

    // Get Order
    public async getOrder(id:string): Promise<IIdentifiableOrderItem> {
        const categories = Object.values(ItemCategory);
        for (const category of categories) {
            const repo = await this.getRepo(category);
            const order = await repo.get(id);
            if (order) {
                return order;
            }
        }
        throw new ServiceException(`order with id ${id} not found`);
    }

    // Update Order
    public async updateOrder(order: IIdentifiableOrderItem): Promise<void> {
        // validation
        this.validateOrder(order);

        // persist the updated order
        const repo = await this.getRepo(order.getItem().getCategory());
        repo.update(order);
    }

    // Delete Order
    public async deleteOrder(id: string): Promise<void> {
        const categories = Object.values(ItemCategory);
        for (const category of categories) {
            const repo = await this.getRepo(category);
            const order = await repo.get(id);
            if (order) {
                await repo.delete(id);
                return;
            }
        }
        throw new ServiceException(`order with id ${id} not found`);
    }

    // Get All Orders
    public async getAllOrders(): Promise<IIdentifiableOrderItem[]> {
        const allOrders: IIdentifiableOrderItem[] = [];
        const categories = Object.values(ItemCategory);
        for (const category of categories) {
            const repo = await this.getRepo(category);
            const categoryOrders = await repo.getAll();
            allOrders.push(...categoryOrders);
        }
        return allOrders;
    }

    // get total revenue
    public async getTotalRevenue(): Promise<number> {
        const orders = await this.getAllOrders();
        const revenues = orders.map(order => order.getPrice() * order.getQuantity());
        let total = 0;
        for (const revenue of revenues) {
            total += revenue;
        }
        return total;
    }

    // get total orders
    public async getTotalOrders(): Promise<number> {
        const allOrders = await this.getAllOrders();
        return allOrders.length;
    }

    private async getRepo (category: ItemCategory): Promise<IRepository<IIdentifiableOrderItem>> {
        return RepositoryFactory.create(config.dbMode, category);
    }

    private validateOrder(order: IIdentifiableOrderItem): void {
        if (!order.getId() || !order.getItem() || order.getPrice() <= 0 || order.getQuantity() <= 0) {
            throw new ServiceException("Invalid order: id, item, price, and quantity must be valid.");
        }
    }
}