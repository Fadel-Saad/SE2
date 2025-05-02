import { CSVOrderMapper, JSONOrderMapper, XMLOrderMapper } from "./mappers/Order.mapper";
import { CSVCakeMapper } from "./mappers/Cake.mapper";
import { JSONBookMapper } from "./mappers/Book.mapper";
import { XMLToyMapper } from "./mappers/Toy.mapper";
import { readCSVFile } from "./parsers/csvParser";
import { readJsonFile } from "./parsers/jsonParser";
import { readXmlFile } from "./parsers/xmlParser";
import logger from "./util/logger";

async function runCakeMapper() {
    const data = await readCSVFile("src/data/cake orders.csv");
    const cakeMapper = new CSVCakeMapper();
    const orderMapper = new CSVOrderMapper(cakeMapper);
    const orders = data.map(row => orderMapper.map(row));
    
    logger.info("List of orders: \n %o", orders);
}

runCakeMapper();


async function runBookMapper() {
    const data = await readJsonFile("src/data/book orders.json");
    const bookMapper = new JSONBookMapper();
    const orderMapper = new JSONOrderMapper(bookMapper);
    const orders = data.map((row: {} | []) => orderMapper.map(row));
    
    logger.info("List of orders: \n %o", orders);
}

runBookMapper();

async function runToyMapper() {
    const res = await readXmlFile("src/data/toy orders.xml");
    const toyMapper = new XMLToyMapper();
    const orderMapper = new XMLOrderMapper(toyMapper);
    const orders = res.data.row.map((row: {} | []) => orderMapper.map(row));
    
    logger.info("List of orders: \n %o", orders);
}

runToyMapper();
