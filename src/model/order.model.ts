import { Item } from "./item.model";

export interface Order {
    getItem(): Item;
    getPrice(): number;
    getQuantity(): number;
    getId(): string;
}