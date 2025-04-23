import { FinanceCalculator, OrderManagement, Validator, Order } from "../src/app";

describe("OrderManagement", ()  => {
    // before all, new validator and new calculator
    // before each, new order manager
    // we define types of each class
    let validator: Validator;
    let calc: FinanceCalculator;
    let orderManager: OrderManagement;
    // 
    let baseValidator: (order: Order) => void;

    beforeAll(() => {
        validator = new Validator();
        calc = new FinanceCalculator();
    });

    beforeEach(() => {
        baseValidator = validator.validate;
        // we set the validate method with a mock fn that doesn't depend on external data
        validator.validate = jest.fn();
        orderManager = new OrderManagement(validator, calc);
    })

    // we reset the validate method to its original form after each test
    afterEach(() => {
        validator.validate = baseValidator;
    })

    it("should add an order", () => {
        // Arrange
        const item = "sponge";
        const price = 15;

        // Act
        orderManager.addOrder(item, price);

        // Assert
        expect(orderManager.getOrders()).toEqual([{ id: 1, item, price }]);
    })

    it("should get an order", () => {
        // Arrange
        const item = "sponge";
        const price = 15;

        // Act
        const order = orderManager.getOrder(1);

        // Assert
        expect(order).toEqual({ id: 1, item, price });
    });

    it("should call finanvce calculator getRevenue", () => {
        // Arrange
        const item = "sponge";
        const price = 15;
        orderManager.addOrder(item, price);
        const spy = jest.spyOn(calc, "getRevenue");

        // Act
        orderManager.getTotalRevenue();

        // Assert
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([{ id: 1, item, price }])
        expect(spy).toHaveReturnedWith(15);
    })

});

describe("FinanceCaclulator", () => {
    it("should get the totla revenue", () => {
        // Arrange
        const calc = new FinanceCalculator();
        const orders = [
            { id: 1, item: "Sponge", price: 15 },
            { id: 2, item: "Chocolate", price: 10 },
            { id: 3, item: "Fruit", price: 10 } 
    ];

        // Act
        const revenue = calc.getRevenue(orders);

        // Assert
        expect(revenue).toEqual(35);
    });

    it("should get the average buy power", () => {
        // Arrange
        const calc = new FinanceCalculator();
        const orders = [
            { id: 1, item: "Sponge", price: 15 },
            { id: 2, item: "Chocolate", price: 10 },
            { id: 3, item: "Fruit", price: 10 } 
    ];

        // Act
        const buyPower = calc.getAverageBuyPower(orders);

        // Assert
        expect(buyPower).toBeCloseTo(11.67);
    });

});