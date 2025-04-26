import * as fs from 'fs/promises';
import { readCSVFile } from '../src/parsers/csvParser'

jest.mock('fs/promises', () => ({
    readFile: jest.fn(), // Mock fs.promises.readFile
}));

describe("CSV Parser", () => {
    const mockFilePath = "./mockFile.csv";
    const mockCsvContent = `name,age
    John Doe,30`;
    const malformedCsvContent = `name,age\nJohn Doe,30\nJane Doe`;
    const emptyCsvContent = "";

    afterEach(() => {
        // Reset mocks
        jest.clearAllMocks();
    });

    it("should read a CSV file and return an object", async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(mockCsvContent);

        const res = await readCSVFile(mockFilePath);

        // Assert that readFile was called with the correct file path
        expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');

        // Assert that the result matches the expected object
        expect(res).toEqual([{ name: 'John Doe', age: "30" }]);
    });

    it('should throw an error if the CSV is malformed', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(malformedCsvContent);

        await expect(readCSVFile(mockFilePath)).rejects.toThrow("Malformed CSV");

        // Assert that readFile was called with the correct file path
        expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');
    });

    it("should throw an error if the CSV file is empty", async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(emptyCsvContent);

        await expect(readCSVFile(mockFilePath)).rejects.toThrow("Empty CSV file");

        // Assert that readFile was called with the correct file path
        expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');
    });

    it('should throw an error if the file cannot be read', async () => {
        // Mock the readFile function to throw an error
        const mockError = new Error('File not found');
        (fs.readFile as jest.Mock).mockRejectedValue(mockError);

        await expect(readCSVFile(mockFilePath)).rejects.toThrow('File not found');

        // Assert that readFile was called with the correct file path
        expect(fs.readFile).toHaveBeenCalledWith(mockFilePath, 'utf-8');
    });
});