import logger from "./util/logger";
import { CakeBuilder, IdentifiableCakeBuilder } from "./model/builders/cake.builder";
import { IdentifiableOrderItemBuilder, OrderBuilder } from "./model/builders/order.builder";
import { OrderRepository } from "./repository/postgreSQL/Order.repository";
import { CakeRepository } from "./repository/postgreSQL/Cake.order.repository";
import { BookBuilder, IdentifiableBookBuilder } from "./model/builders/book.builder";
import { BookRepository } from "./repository/postgreSQL/Book.order.repository";
import { IdentifiableToyBuilder, ToyBuilder } from "./model/builders/toy.builder";
import { ToyRepository } from "./repository/postgreSQL/Toy.order.repository";


async function DBSandBox() {
    // const dbOrder = new OrderRepository(new CakeRepository());
    // const dbOrder = new OrderRepository(new BookRepository());
    const dbOrder = new OrderRepository(new ToyRepository());
    await dbOrder.init();

    // create identifiable cake
    // const cake = CakeBuilder.newBuilder().setType("cake")
    // .setFlavor("chocolate").setFilling("cream")
    // .setSize(10).setLayers(2).setFrostingType("buttercream")
    // .setFrostingFlavor("vanilla").setDecorationType("sprinkles")
    // .setDecorationColor("red").setCustomMessage("happy birthday")
    // .setShape("round").setAllergies("nuts")
    // .setSpecialIngredients("none").setPackagingType("box").build();

    // const idCake = IdentifiableCakeBuilder.newBuilder().setCake(cake).setId(Math.random().toString(36).substring(2, 15)).build();

    // // create identifiable order
    // const cakeOrder = OrderBuilder.newBuilder().setPrice(100).setItem(cake).setQuantity(1).setId(Math.random().toString(36).substring(2, 15)).build();
    // const idCakeOrder = IdentifiableOrderItemBuilder.newBuilder().setItem(idCake).setOrder(cakeOrder).build();

    const book = BookBuilder.newBuilder().setOrderId(324).setTitle("title")
    .setAuthor("author").setGenre("genre").setFormat("format").setLanguage("English")
    .setPublisher("publisher").setSpecialEdition("specialEdition").setPackaging("packaging").build();

    const idBook = IdentifiableBookBuilder.newBuilder().setBook(book).setId(Math.random().toString(36).substring(2, 15)).build();

    const bookOrder = OrderBuilder.newBuilder().setPrice(100).setItem(book).setQuantity(1).setId(Math.random().toString(36).substring(2, 15)).build();
    const idBookOrder = IdentifiableOrderItemBuilder.newBuilder().setItem(idBook).setOrder(bookOrder).build();

    const toy = ToyBuilder.newBuilder().setOrderId(526).setType("toy")
    .setAgeGroup("3-5").setBrand("brand").setMaterial("plastic").setBatteryRequired(true)
    .setEducational(false).build();

    const idToy = IdentifiableToyBuilder.newBuilder().setToy(toy).setId(Math.random().toString(36).substring(2, 15)).build();

    const toyOrder = OrderBuilder.newBuilder().setPrice(100).setItem(toy).setQuantity(1).setId(Math.random().toString(36).substring(2, 15)).build();
    const idToyOrder = IdentifiableOrderItemBuilder.newBuilder().setItem(idToy).setOrder(toyOrder).build();

    await dbOrder.create(idToyOrder);
    console.log(await dbOrder.get(idToyOrder.getId()));
    await dbOrder.delete(idToyOrder.getId());
    // await dbOrder.create(idBookOrder);
    // await dbOrder.create(idCakeOrder);
    // await dbOrder.delete(idCakeOrder.getId());
    // await dbOrder.update(idCakeOrder);
    console.log("working");
    // console.log((await dbOrder.getAll()).length);
    
}

DBSandBox().catch((error) => logger.error("Error in DB sandbox: %o", error as Error));


// async function runBookMapper() {
//     const data = await readJsonFile("src/data/book orders.json");
//     const bookMapper = new JSONBookMapper();
//     const orderMapper = new JSONOrderMapper(bookMapper);
//     const orders = data.map((row: {} | []) => orderMapper.map(row));
    
//     logger.info("List of orders: \n %o", orders);
// }

// runBookMapper();

// async function runToyMapper() {
//     const res = await readXmlFile("src/data/toy orders.xml");
//     const toyMapper = new XMLToyMapper();
//     const orderMapper = new XMLOrderMapper(toyMapper);
//     const orders = res.data.row.map((row: {} | []) => orderMapper.map(row));
    
//     logger.info("List of orders: \n %o", orders);
// }

// runToyMapper();
