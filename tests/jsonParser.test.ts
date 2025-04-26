import * as fs from 'fs/promises';
import { readJsonFile } from '../src/parsers/jsonParser';

jest.mock('fs/promises', () => ({
    readFile: jest.fn(), // Mock fs.promises.readFile
}));

describe("JSON Parser", () => {
    const mockFilePath = "./mockFile.json";
    const mockFileContent = '{"name": "John Doe", "age": 30}';
    const invalidJsonContent = '{ invalid json }';
    const emptyJsonContent = "";

    afterEach(() => {
        // Reset mocks
        jest.clearAllMocks();
    })

    it("should read a JSON file and return an object", async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(mockFileContent);

        const res = await readJsonFile(mockFilePath);

        // Assert that readFile was called with the correct file path
        expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');

        // Assert that the result matches the expected object
        expect(res).toEqual({ name: 'John Doe', age: 30 });
    });

    it('should throw an error if the JSON is malformed', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(invalidJsonContent);

        await expect(readJsonFile(mockFilePath)).rejects.toThrow("Malformed JSON");

        // Assert that readFile was called with the correct file path
        expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');
    });

    it("should throw an error if the JSON file is empty", async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(emptyJsonContent);

        await expect(readJsonFile(mockFilePath)).rejects.toThrow("Empty JSON file");

        // Assert that readFile was called with the correct file path
        expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');
    });

    it('should throw an error if the file cannot be read', async () => {
        // Mock the readFile function to throw an error
        const mockError = new Error('File not found');
        (fs.readFile as jest.Mock).mockRejectedValue(mockError);

        await expect(readJsonFile(mockFilePath)).rejects.toThrow('File not found');

        // Assert that readFile was called with the correct file path
        expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');
    });

    
});