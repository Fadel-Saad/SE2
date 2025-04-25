import * as fs from 'fs/promises';

export async function readJsonFile(path: string): Promise<{}[]> {
    
        const jsonString = await fs.readFile(path, "utf-8");

        if (!jsonString.trim()) {
            throw new Error("Empty JSON file");
        }

        try {
            const data = JSON.parse(jsonString);
            return data;
        } catch (err) {
            throw new Error("Malformed JSON");
        }
}

// Running JSON Parser:

// async function json() {
//     const data = await readJsonFile("src/data/book orders.json");
//     console.log(data);
//     // logger.info(data);
    
// }

// json();