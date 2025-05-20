import { OrderRepository } from '../src/repository/postgreSQL/Order.repository';
import { CakeRepository } from '../src/repository/postgreSQL/Cake.order.repository';
import { BookRepository } from '../src/repository/postgreSQL/Book.order.repository';
import { ToyRepository } from '../src/repository/postgreSQL/Toy.order.repository';
import { CakeBuilder, IdentifiableCakeBuilder } from '../src/model/builders/cake.builder';
import { OrderBuilder, IdentifiableOrderItemBuilder } from '../src/model/builders/order.builder';
import { BookBuilder, IdentifiableBookBuilder } from '../src/model/builders/book.builder';
import { IdentifiableToyBuilder, ToyBuilder } from '../src/model/builders/toy.builder';
import { postgreConnectionManager } from '../src/repository/postgreSQL/postgreConnectionManager';

describe('Cake Order Repository CRUD operations', () => {
    let dbOrder: OrderRepository;
    let cake: any;
    let idCake: any;
    let cakeOrder: any;
    let idCakeOrder: any;

    beforeAll(async () => {
        dbOrder = new OrderRepository(new CakeRepository());
        await dbOrder.init();

        cake = CakeBuilder.newBuilder()
            .setType("cake").setFlavor("chocolate").setFilling("cream").setSize(10)
            .setLayers(2).setFrostingType("buttercream").setFrostingFlavor("vanilla")
            .setDecorationType("sprinkles").setDecorationColor("red").setCustomMessage("happy birthday")
            .setShape("round").setAllergies("nuts").setSpecialIngredients("none").setPackagingType("box")
            .build();

        idCake = IdentifiableCakeBuilder.newBuilder()
            .setCake(cake).setId(Math.random().toString(36).substring(2, 15)).build();

        cakeOrder = OrderBuilder.newBuilder()
            .setPrice(100).setItem(cake).setQuantity(1).setId(Math.random().toString(36).substring(2, 15)).build();

        idCakeOrder = IdentifiableOrderItemBuilder.newBuilder()
            .setItem(idCake).setOrder(cakeOrder).build();
    });

    afterAll(async () => {
        // Clean up database if needed
        const allOrders = await dbOrder.getAll();
        for (const o of allOrders) {
            await dbOrder.delete(o.getId());
        };
    });

    it('should create a cake order', async () => {
        await dbOrder.create(idCakeOrder);
        const fetched = await dbOrder.get(idCakeOrder.getId());
        expect(fetched).toBeDefined();
        expect(fetched.getId()).toBe(idCakeOrder.getId());
    });

    it('should not create duplicate orders', async () => {
        await expect(dbOrder.create(idCakeOrder)).rejects.toThrow();
    });

    it('should get all orders', async () => {
        const all = await dbOrder.getAll();
        expect(all.length).toBeGreaterThan(0);
        expect(all.some(o => o.getId() === idCakeOrder.getId())).toBe(true);
    });

    it('should update an order', async () => {
        await dbOrder.update(idCakeOrder);
        const fetched = await dbOrder.get(idCakeOrder.getId());
        expect(fetched.getPrice()).toBe(100);
        expect(fetched.getQuantity()).toBe(1);
    });

    it('should delete an order', async () => {
        await dbOrder.delete(idCakeOrder.getId());
        await expect(dbOrder.get(idCakeOrder.getId())).rejects.toThrow();
    });

    it('should throw an error when getting non-existent order', async () => {
        await expect(dbOrder.get('nonexistent-id')).rejects.toThrow();
    });

});

describe("Book order repository CRUD operations", () => {
    let dbOrder: OrderRepository;
    let book: any;
    let idBook: any;
    let bookOrder: any;
    let idBookOrder: any;

    beforeAll(async () => {
        dbOrder = new OrderRepository(new BookRepository());
        await dbOrder.init();

        book = BookBuilder.newBuilder().setOrderId(324).setTitle("title")
        .setAuthor("author").setGenre("genre").setFormat("format").setLanguage("English")
        .setPublisher("publisher").setSpecialEdition("specialEdition").setPackaging("packaging").build();

        idBook = IdentifiableBookBuilder.newBuilder().setBook(book).setId(Math.random().toString(36).substring(2, 15)).build();

        bookOrder = OrderBuilder.newBuilder().setPrice(200).setItem(book).setQuantity(2).setId(Math.random().toString(36).substring(2, 15)).build();
        idBookOrder = IdentifiableOrderItemBuilder.newBuilder().setItem(idBook).setOrder(bookOrder).build();
    })

    afterAll(async () => {
        // Clean up database if needed
        const allOrders = await dbOrder.getAll();
        for (const o of allOrders) {
            await dbOrder.delete(o.getId());
        };
    });

    it('should create a book order', async () => {
        await dbOrder.create(idBookOrder);
        const fetched = await dbOrder.get(idBookOrder.getId());
        expect(fetched).toBeDefined();
        expect(fetched.getId()).toBe(idBookOrder.getId());
    });

    it('should not create duplicate orders', async () => {
        await expect(dbOrder.create(idBookOrder)).rejects.toThrow();
    });

    it('should get all orders', async () => {
        const all = await dbOrder.getAll();
        expect(all.length).toBeGreaterThan(0);
        expect(all.some(o => o.getId() === idBookOrder.getId())).toBe(true);
    });

    it('should update an order', async () => {
        await dbOrder.update(idBookOrder);
        const fetched = await dbOrder.get(idBookOrder.getId());
        expect(fetched.getPrice()).toBe(200);
        expect(fetched.getQuantity()).toBe(2);
    });

    it('should delete an order', async () => {
        await dbOrder.delete(idBookOrder.getId());
        await expect(dbOrder.get(idBookOrder.getId())).rejects.toThrow();
    });
});

describe("Toy order repository CRUD operations", () => {
    let dbOrder: OrderRepository;
    let toy: any;
    let idToy: any;
    let toyOrder: any;
    let idToyOrder: any;

    beforeAll(async () => {
        dbOrder = new OrderRepository(new ToyRepository());
        await dbOrder.init();

        toy = ToyBuilder.newBuilder().setOrderId(526).setType("toy")
        .setAgeGroup("3-5").setBrand("brand").setMaterial("plastic").setBatteryRequired(true)
        .setEducational(false).build();

        idToy = IdentifiableToyBuilder.newBuilder().setToy(toy).setId(Math.random().toString(36).substring(2, 15)).build();

        toyOrder = OrderBuilder.newBuilder().setPrice(300).setItem(toy).setQuantity(3).setId(Math.random().toString(36).substring(2, 15)).build();
        idToyOrder = IdentifiableOrderItemBuilder.newBuilder().setItem(idToy).setOrder(toyOrder).build();
    })

    afterAll(async () => {
        // Clean up database if needed
        const allOrders = await dbOrder.getAll();
        for (const o of allOrders) {
            await dbOrder.delete(o.getId());
        };

        // Close the database connection
        await postgreConnectionManager.closePostgreConnection();
    });

    it('should create a toy order', async () => {
        await dbOrder.create(idToyOrder);
        const fetched = await dbOrder.get(idToyOrder.getId());
        expect(fetched).toBeDefined();
        expect(fetched.getId()).toBe(idToyOrder.getId());
    });

    it('should not create duplicate orders', async () => {
        await expect(dbOrder.create(idToyOrder)).rejects.toThrow();
    });

    it('should get all orders', async () => {
        const all = await dbOrder.getAll();
        expect(all.length).toBeGreaterThan(0);
        expect(all.some(o => o.getId() === idToyOrder.getId())).toBe(true);
    });

    it('should update an order', async () => {
        await dbOrder.update(idToyOrder);
        const fetched = await dbOrder.get(idToyOrder.getId());
        expect(fetched.getPrice()).toBe(300);
        expect(fetched.getQuantity()).toBe(3);
    });

    it('should delete an order', async () => {
        await dbOrder.delete(idToyOrder.getId());
        await expect(dbOrder.get(idToyOrder.getId())).rejects.toThrow();
    });
});