import * as fs from 'fs/promises';
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
    
        const fileContent = await fs.readFile(filePath, "utf-8");

        if(!fileContent.trim()) {
            throw new Error("Empty CSV file");
        }
            return new Promise((resolve, reject) => {
                csvParse(fileContent, {
                    trim: true,
                    skip_empty_lines: true
                }, (err, records: string[][]) => {
                    if(err) {
                        reject( new Error("Malformed CSV"));
                        return
                    }

                    if(!includeHeader) records.shift();
                    resolve(records);
                });
            });
}