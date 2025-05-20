import { IIdentifiableItem, IItem, ItemCategory } from "./IItem";
import { id } from "repository/IRepository";


export class Toy implements IItem {
    private orderId: number;
    private type: string;
    private ageGroup:string
    private brand:string;
    private material:string;
    private batteryRequired:boolean;
    private educational:boolean;

    constructor (
        orderId: number,
        type: string,
        ageGroup: string,
        brand:string,
        material:string,
        batteryRequired:boolean,
        educational:boolean,
    ) {
        this.orderId = orderId,
        this.type = type,
        this.ageGroup = ageGroup,
        this.brand = brand,
        this.material = material,
        this.batteryRequired = batteryRequired,
        this.educational = educational
    }

    getCategory(): ItemCategory {
        return ItemCategory.TOY;
    }

    getOrderId(): number {
        return this.orderId;
    }

    getType(): string {
        return this.type;
    }

    getAgeGroup(): string {
        return this.ageGroup;
    }

    getBrand(): string {
        return this.brand;
    }

    getMaterial(): string {
        return this.material;
    }

    getBatteryRequired(): boolean {
        return this.batteryRequired;
    }

    getEducational(): boolean {
        return this.educational;
    }
}

export class IdentifiableToy extends Toy implements IIdentifiableItem {

    constructor(
        private id: id,
        orderId: number,
        type: string,
        ageGroup: string,
        brand:string,
        material:string,
        batteryRequired:boolean,
        educational:boolean,
    ) {
        super(
            orderId,
            type,
            ageGroup,
            brand,
            material,
            batteryRequired,
            educational,
        )
    }

    getId(): id {
        return this.id;
    }
    
}