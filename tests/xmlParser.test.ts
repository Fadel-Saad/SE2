import * as fs from 'fs/promises';
import { readXmlFile } from '../src/parsers/xmlParser';

jest.mock('fs/promises', () => ({
    readFile: jest.fn(), // Mock fs.promises.readFile
}));

describe("XML Parser", () => {
    const mockFilePath = "./mockFile.xml";
    const mockXmlContent = `<person><name>John Doe</name><age>30</age></person>`;
    const malformedXmlContent = `<person><name>John Doe<age>30</age></person>`;
    const emptyXmlContent = "";

    afterEach(() => {
        // Reset mocks
        jest.clearAllMocks();
    });

    it("should read an XML file and return an object", async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(mockXmlContent);

        const res = await readXmlFile(mockFilePath);

        // Assert that readFile was called with the correct file path
        expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');

        // Assert that the result matches the expected object
        expect(res).toEqual({ person: { name: "John Doe", age: "30" } });
    });

    it("should throw an error if the XML data is malformed", async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(malformedXmlContent);

        await expect(readXmlFile(mockFilePath)).rejects.toThrow("Malformed XML");

        // Assert that readFile was called with the correct file path
        expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');
    });

    it("should throw an error if the XML file is empty", async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(emptyXmlContent);

        await expect(readXmlFile(mockFilePath)).rejects.toThrow("Empty XML file");

        // Assert that readFile was called with the correct file path
        expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');
    });

    it("should throw an error if the file cannot be read", async () => {
        const mockError = new Error("File not found");
        (fs.readFile as jest.Mock).mockRejectedValue(mockError);

        await expect(readXmlFile(mockFilePath)).rejects.toThrow("File not found");

        // Assert that readFile was called with the correct file path
        expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');
    });
});