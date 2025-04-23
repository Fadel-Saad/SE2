import { promises as fs } from "fs";
import { parse as csvParse } from "csv-parse";
import { stringify as csvStringify } from "csv-stringify";

/**
 * Reads a CSV file and returns its contents as a 2D array of strings
 * @param filePath - Path to the CSV file
 * @param includeHeader - Whether to include the header row in the output
 * @returns Promise<string[][]> - 2D array of strings
 * csvParse takes an input file & a callback fn that receives any error thrown by the
 * CSV parser in the first parameter (err), or an array of records in the second argument (output)
 * since the csvParse fn doesn't return a promise natively like fetch, we must return one ourselves
 * which is why we say new Promise
 */

export async function readCSVFile(filePath: string, includeHeader: boolean = false): Promise<string[][]> {
    try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        return new Promise((resolve, reject) => {
            csvParse(fileContent, {
                trim: true,
                skip_empty_lines: true
            }, (err, records: string[][]) => {
                if(err) reject(err);
                if(!includeHeader) records.shift();
                resolve(records);
            });
        });
    } catch (error) {
        throw new Error(`Error reading CSV file: ${error}`);
    }
}

/**
 * Writes a 2D array of strings to a CSV file
 * @param filePath - Path where the csv file should be written
 * @param data - 2D array of strings to write
 * @returns Promise<void>
 */

export async function writeCSVFile(filePath: string, data: string[][]): Promise<void> {
    try {
        const csvContent = await new Promise<string>((resolve, reject) => {
            csvStringify(data, (err, output) => {
                if(err) reject(err);
                resolve(output);
            });
        });
        await fs.writeFile(filePath, csvContent,"utf-8");
        
    } catch (error) {
        throw new Error(`Error writing CSV file: ${error}`);
    }
}

