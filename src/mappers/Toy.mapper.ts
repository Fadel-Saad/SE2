import { ToyBuilder } from "../model/builders/toy.builder";
import { Toy } from "../model/Toy.model";
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
                        .setPrice(parseInt(objectValues[7]))
                        .setQuantity(parseInt(objectValues[8]))
                        .build();
    }
    
}