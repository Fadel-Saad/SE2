import { IdentifiableOrderItemBuilder, OrderBuilder } from "../model/builders/order.builder";
import { IMapper } from "./IMapper";
import { IOrder } from "../model/IOrder";
import { IIdentifiableItem, IItem } from "../model/IItem";
import { IdentifiableOrderItem } from "model/order.model";

export class CSVOrderMapper implements IMapper<string[], IOrder> {
    constructor(private itemMapper: IMapper<string[], IItem>) {
    }
    map(data: string[]): IOrder {
        const item: IItem = this.itemMapper.map(data);
        return OrderBuilder.newBuilder()
                            .setId(data[0])
                            .setQuantity(parseInt(data[data.length - 1]))
                            .setPrice(parseInt(data[data.length - 2]))
                            .setItem(item)
                            .build()
    }
    
    reverseMap(data: IOrder): string[] {
        const item = this.itemMapper.reverseMap(data.getItem());
        return [
            data.getId(),
            ...item,
            data.getPrice().toString(),
            data.getQuantity().toString()
        ]
    }
}

export interface SQLiteOrder {
    id: string;
    quantity: number;
    price: number;
    item_category: string;
    item_id: string;
}

export class SQLiteOrderMapper implements IMapper<{data:SQLiteOrder, item: IIdentifiableItem}, IdentifiableOrderItem> {
    
    map({data, item}: {data:SQLiteOrder, item: IIdentifiableItem}): IdentifiableOrderItem {
        const order = OrderBuilder.newBuilder().setId(data.id)
        .setQuantity(data.quantity)
        .setPrice(data.price)
        .setItem(item)
        .build()
        return IdentifiableOrderItemBuilder.newBuilder().setOrder(order).setItem(item).build();
    }
    
    reverseMap(data: IdentifiableOrderItem): {data:SQLiteOrder, item: IIdentifiableItem} {
        return {
            data: {
                id: data.getId(),
                quantity: data.getQuantity(),
                price: data.getPrice(),
                item_category: data.getItem().getCategory(),
                item_id: data.getItem().getId()
            },
            item: data.getItem()
        }
    }
}

// export class JSONOrderMapper implements IMapper<{} | [], IOrder> {
//     constructor(private itemMapper: IMapper<{} | [], IItem>) {
//     }
//     map(data: {} | []): IOrder {
//         const objectValues = Object.values(data);
//         const item: IItem = this.itemMapper.map(objectValues);
//         return OrderBuilder.newBuilder()
//                             .setId(objectValues[0])
//                             .setQuantity(parseInt(objectValues[objectValues.length - 1]))
//                             .setPrice(parseInt(objectValues[objectValues.length - 2]))
//                             .setItem(item)
//                             .build()
//     }
// }

// export class XMLOrderMapper implements IMapper<{} | [], IOrder> {
//     constructor(private itemMapper: IMapper<{} | [], IItem>) {
//     }
//     map(data: {} | []): IOrder {
//         const objectValues = Object.values(data);
//         const item: IItem = this.itemMapper.map(objectValues);
//         return OrderBuilder.newBuilder()
//                             .setId(objectValues[0])
//                             .setQuantity(parseInt(objectValues[objectValues.length - 1]))
//                             .setPrice(parseInt(objectValues[objectValues.length - 2]))
//                             .setItem(item)
//                             .build()
//     }
// }