import { OrderBuilder } from "../model/builders/order.builder";
import { IMapper } from "./IMapper";
import { IOrder } from "../model/IOrder";
import { IItem } from "../model/IItem";

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
    
}

export class JSONOrderMapper implements IMapper<{} | [], IOrder> {
    constructor(private itemMapper: IMapper<{} | [], IItem>) {
    }
    map(data: {} | []): IOrder {
        const objectValues = Object.values(data);
        const item: IItem = this.itemMapper.map(objectValues);
        return OrderBuilder.newBuilder()
                            .setId(objectValues[0])
                            .setQuantity(parseInt(objectValues[objectValues.length - 1]))
                            .setPrice(parseInt(objectValues[objectValues.length - 2]))
                            .setItem(item)
                            .build()
    }
}

export class XMLOrderMapper implements IMapper<{} | [], IOrder> {
    constructor(private itemMapper: IMapper<{} | [], IItem>) {
    }
    map(data: {} | []): IOrder {
        const objectValues = Object.values(data);
        const item: IItem = this.itemMapper.map(objectValues);
        return OrderBuilder.newBuilder()
                            .setId(objectValues[0])
                            .setQuantity(parseInt(objectValues[objectValues.length - 1]))
                            .setPrice(parseInt(objectValues[objectValues.length - 2]))
                            .setItem(item)
                            .build()
    }
}