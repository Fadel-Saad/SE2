import * as fs from 'fs/promises';
import util from 'node:util';
import { parseStringPromise } from "xml2js";

export async function readXmlFile(path: string):Promise<any> {
        
        const xml = await fs.readFile(path, "utf-8");

        if (!xml.trim()) {
            throw new Error("Empty XML file");
        }

        try {
            const res = await parseStringPromise(xml, { explicitArray: false, trim: true });
            return res;
        } catch (err) {
            throw new Error("Malformed XML");
        }
}