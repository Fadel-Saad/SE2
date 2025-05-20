import { IdentifiableOrderItem, Order } from "../order.model";
import { IIdentifiableItem, IItem } from "../IItem";
import logger from "../../util/logger";

export class OrderBuilder {
    private item!: IItem;
    private price!: number;
    private quantity!: number;
    private id!: string;

    public static newBuilder(): OrderBuilder {
        return new OrderBuilder()
    }

    setItem(item: IItem): OrderBuilder {
        this.item = item;
        return this;
    }

    setPrice(price: number): OrderBuilder {
        this.price = price;
        return this;
    }

    setQuantity(quantity: number): OrderBuilder {
        this.quantity = quantity;
        return this;
    }

    setId(id: string): OrderBuilder {
        this.id = id;
        return this;
    }

    build(): Order {
        const requiredProperties = [
            this.item,
            this.price,
            this.quantity,
            this.id,
        ];

        for (const prop of requiredProperties) {
            if(prop === undefined) {
                logger.error("Missing required properties, could not build a cake");
                throw new Error("Missing required properties");
            }
        }

        return new Order(
            this.item,
            this.price,
            this.quantity,
            this.id,
        );
    }
}

export class IdentifiableOrderItemBuilder {
    private item!: IIdentifiableItem;
    private order!: Order;

    static newBuilder(): IdentifiableOrderItemBuilder {
        return new IdentifiableOrderItemBuilder()
    }

    setItem(item: IIdentifiableItem): IdentifiableOrderItemBuilder {
        this.item = item;
        return this;
    }

    setOrder(order: Order): IdentifiableOrderItemBuilder {
        this.order = order;
        return this;
    }

    build(): IdentifiableOrderItem {
        if (!this.item || !this.order) {
            throw new Error("Missing required properties to build an Identifiable Order");
        }
        return new IdentifiableOrderItem(this.item, this.order.getPrice(), this.order.getQuantity(), this.order.getId());

    }
}