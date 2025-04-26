import logger from './util/logger';
import util from 'node:util';
import { readCSVFile } from './parsers/csvParser'
import { readJsonFile } from './parsers/jsonParser';
import { readXmlFile } from './parsers/xmlParser';

// CSV Parser:

// async function csv() {
//     const data = await readCSVFile("src/data/cake orders.csv", true);
//     // for each data row, log the the row
//     data.forEach((row) => logger.info(row));
// }

// csv();


// JSON Parser

// async function json() {
//     const data = await readJsonFile("src/data/book orders.json");
//     console.log(data);
//     // logger.info(data);
    
// }

// json();


// XML parser

async function xml() {
    const res = await readXmlFile("src/data/toy orders.xml");
    // console.log(JSON.stringify(data, null, 2));
    console.log(util.inspect(res, false, null));
}

xml();