import { Toy } from "../Toy.model";
import logger from "../../util/logger";

export class ToyBuilder {
    private orderId!: number;
    private type!: string;
    private ageGroup!:string
    private brand!:string;
    private material!:string;
    private batteryRequired!:boolean;
    private educational!:boolean;
    private price!: number;
    private quantity!: number;

    public static newBuilder(): ToyBuilder {
        return new ToyBuilder();
    }

    setOrderId(orderId: number) :ToyBuilder {
        this.orderId = orderId;
        return this;
    }

    setType(type: string) :ToyBuilder {
        this.type = type;
        return this;
    }

    setAgeGroup(ageGroup: string) :ToyBuilder {
        this.ageGroup = ageGroup;
        return this;
    }

    setBrand(brand: string) :ToyBuilder {
        this.brand = brand;
        return this;
    }

    setMaterial(material: string) :ToyBuilder {
        this.material = material;
        return this;
    }

    setBatteryRequired(batteryRequired: boolean) :ToyBuilder {
        this.batteryRequired = batteryRequired;
        return this;
    }

    setEducational(educational: boolean) :ToyBuilder {
        this.educational = educational;
        return this;
    }

    setPrice(price: number) :ToyBuilder {
        this.price = price;
        return this;
    }

    setQuantity(quantity: number) :ToyBuilder {
        this.quantity = quantity;
        return this;
    }


    build(): Toy {
        const requiredProperties = [
            this.orderId,
            this.type,
            this.ageGroup,
            this.brand,
            this.material,
            this.batteryRequired,
            this.educational,
            this.price,
            this.quantity,
        ];
        
        for (const property of requiredProperties) {
            if (property === undefined) {
                logger.error("Missing required properties, could not build a toy");
                throw new Error("Missing required properties");
            }
        }

        return new Toy(
            this.orderId,
            this.type,
            this.ageGroup,
            this.brand,
            this.material,
            this.batteryRequired,
            this.educational,
            this.price,
            this.quantity,
        );
    }
}