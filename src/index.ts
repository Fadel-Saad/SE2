import logger from "./util/logger";
import { CakeBuilder, IdentifiableCakeBuilder } from "./model/builders/cake.builder";
import { IdentifiableOrderItemBuilder, OrderBuilder } from "./model/builders/order.builder";
import { OrderRepository } from "./repository/postgreSQL/Order.repository";
import { ToyRepository } from "./repository/postgreSQL/Toy.order.repository";


async function DBSandBox() {

    const dbOrder = new OrderRepository(new ToyRepository());
    await dbOrder.init();

    // create identifiable cake
    const cake = CakeBuilder.newBuilder().setType("cake")
    .setFlavor("chocolate").setFilling("cream")
    .setSize(10).setLayers(2).setFrostingType("buttercream")
    .setFrostingFlavor("vanilla").setDecorationType("sprinkles")
    .setDecorationColor("red").setCustomMessage("happy birthday")
    .setShape("round").setAllergies("nuts")
    .setSpecialIngredients("none").setPackagingType("box").build();

    const idCake = IdentifiableCakeBuilder.newBuilder().setCake(cake).setId(Math.random().toString(36).substring(2, 15)).build();

    // create identifiable order
    const cakeOrder = OrderBuilder.newBuilder().setPrice(100).setItem(cake).setQuantity(1).setId(Math.random().toString(36).substring(2, 15)).build();
    const idCakeOrder = IdentifiableOrderItemBuilder.newBuilder().setItem(idCake).setOrder(cakeOrder).build();

    
    await dbOrder.create(idCakeOrder);
    await dbOrder.delete(idCakeOrder.getId());
    // await dbOrder.update(idCakeOrder);
    console.log((await dbOrder.getAll()).length);
    
}

DBSandBox().catch((error) => logger.error("Error in DB sandbox: %o", error as Error));