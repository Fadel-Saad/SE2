import { IdentifiableToyBuilder, ToyBuilder } from "../model/builders/toy.builder";
import { IdentifiableToy, Toy } from "../model/Toy.model";
import { IMapper } from "./IMapper";

export class XMLToyMapper implements IMapper<{} | [], Toy> {

    map(data: {} | []): Toy {
        const objectValues = Object.values(data);
        console.log(objectValues);
        return ToyBuilder.newBuilder()
                        .setOrderId(parseInt(objectValues[0]))
                        .setType(objectValues[1])
                        .setAgeGroup(objectValues[2])
                        .setBrand(objectValues[3])
                        .setMaterial(objectValues[4])
                        .setBatteryRequired(objectValues[5])
                        .setEducational(objectValues[6])
                        .build();
    }
    
    reverseMap(data: Toy): {} | [] {
        return [
            data.getOrderId(),
            data.getType(),
            data.getAgeGroup(),
            data.getBrand(),
            data.getMaterial(),
            data.getBatteryRequired(),
            data.getEducational()
        ]
    }
}

export interface DBToy {
    id: string;
    orderId: number;
    type: string;
    ageGroup: string;
    brand: string;
    material: string;
    batteryRequired: boolean;
    educational: boolean;
}

export class PostgreSQLToyMapper implements IMapper<DBToy, IdentifiableToy> {

    map(data: DBToy): IdentifiableToy {
        return IdentifiableToyBuilder.newBuilder()
                    .setToy(ToyBuilder.newBuilder()
                        .setOrderId(data.orderId)
                        .setType(data.type)
                        .setAgeGroup(data.ageGroup)
                        .setBrand(data.brand)
                        .setMaterial(data.material)
                        .setBatteryRequired(data.batteryRequired)
                        .setEducational(data.educational)
                        .build())
                    .setId(data.id)
                    .build();
    }
    
    reverseMap(data: IdentifiableToy): DBToy {
        return {
            id: data.getId(),
            orderId: data.getOrderId(),
            type: data.getType(),
            ageGroup: data.getAgeGroup(),
            brand: data.getBrand(),
            material: data.getMaterial(),
            batteryRequired: data.getBatteryRequired(),
            educational: data.getEducational()
        }
    }

}

export class SQLiteToyMapper implements IMapper<DBToy, IdentifiableToy> {

    map(data: DBToy): IdentifiableToy {
        return IdentifiableToyBuilder.newBuilder()
                    .setToy(ToyBuilder.newBuilder()
                        .setOrderId(data.orderId)
                        .setType(data.type)
                        .setAgeGroup(data.ageGroup)
                        .setBrand(data.brand)
                        .setMaterial(data.material)
                        .setBatteryRequired(data.batteryRequired)
                        .setEducational(data.educational)
                        .build())
                    .setId(data.id)
                    .build();
    }
    
    reverseMap(data: IdentifiableToy): DBToy {
        return {
            id: data.getId(),
            orderId: data.getOrderId(),
            type: data.getType(),
            ageGroup: data.getAgeGroup(),
            brand: data.getBrand(),
            material: data.getMaterial(),
            batteryRequired: data.getBatteryRequired(),
            educational: data.getEducational()
        }
    }

}