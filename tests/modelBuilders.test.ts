import { CakeBuilder } from "../src/model/builders/cake.builder";
import { BookBuilder } from "../src/model/builders/book.builder";
import { ToyBuilder } from "../src/model/builders/toy.builder";
import { Cake } from "../src/model/Cake.model";
import { Book } from "../src/model/Book.model";
import { Toy } from "../src/model/Toy.model";

describe("Cake builder tests", () => {

    it("should create a cake instance with the correct properties", () => {
        const cakeBuilder = new CakeBuilder();
        const validCake = cakeBuilder
            .setType("type")
            .setFlavor("flavor")
            .setFilling("filling")
            .setSize(10)
            .setLayers(2)
            .setFrostingType("frostingType")
            .setFrostingFlavor("frostingFlavor")
            .setDecorationType("decorationType")
            .setDecorationColor("decorationColor")
            .setCustomMessage("customMessage")
            .setShape("shape")
            .setAllergies("allergies")
            .setSpecialIngredients("specialIngredients")
            .setPackagingType("packagingType")
            .build();

        expect(validCake).toBeDefined();
        expect(validCake).toBeInstanceOf(Cake);
    });

    it("should should throw an error because of missing arguments", () => {
        const cakeBuilder = new CakeBuilder();
        function buildCake() {
            cakeBuilder
            .setType("type")
            .setFlavor("flavor")
            .setFilling("filling")
            .setSize(10)
            .setLayers(2)
            .setFrostingType("frostingType")
            .build();
        }
        
        expect(buildCake).toThrow();
    });
    
});

describe("Book builder tests", () => {

    it("should create a Book instance with the correct properties", () => {
        const bookBuilder = new BookBuilder();
        const validBook = bookBuilder
            .setOrderId(324)
            .setTitle("title")
            .setAuthor("author")
            .setGenre("genre")
            .setFormat("formet")
            .setLanguage("language")
            .setPublisher("publisher")
            .setSpecialEdition("special")
            .setPackaging("packaging")
            .setPrice(20)
            .setQuantity(4)
            .build();

        expect(validBook).toBeDefined();
        expect(validBook).toBeInstanceOf(Book);
    });

    it("should should throw an error because of wrong data types", () => {
        const bookBuilder = new BookBuilder();
        function buildBook() {
            bookBuilder
            .setOrderId(324)
            .setTitle(true as unknown as string)
            .setAuthor(8 as unknown as string)
            .setGenre("genre")
            .setFormat("format")
            .setLanguage("language")
            .setPublisher("publisher")
            .setSpecialEdition("special")
            .setPackaging("packaging")
            .setPrice(20)
            .setQuantity(4)
            .build();
        }
        
        expect(buildBook).toThrow();
    });
    
});

describe("Toy builder tests", () => {

    it("should create a toy instance with the correct properties", () => {
        const toyBuilder = new ToyBuilder();
        const validToy = toyBuilder
            .setOrderId(106)
            .setType("type")
            .setAgeGroup("ageGroup")
            .setBrand("brand")
            .setMaterial("material")
            .setBatteryRequired(true)
            .setEducational(false)
            .setPrice(25)
            .setQuantity(12)
            .build();

        expect(validToy).toBeDefined();
        expect(validToy).toBeInstanceOf(Toy);
    });


    it("should should throw an error because of missing arguments", () => {
        const toyBuilder = new ToyBuilder();
        function buildToy() {
            toyBuilder.build();
        }
        
        expect(buildToy).toThrow();
    });
    
});