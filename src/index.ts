import logger from './util/logger';
import {readCSVFile} from './parsers/csvParser'

async function main() {
    const data = await readCSVFile("src/data/cake orders.csv", true);
    // for each data row, log the the row
    data.forEach((row) => logger.info(row));
}

main();