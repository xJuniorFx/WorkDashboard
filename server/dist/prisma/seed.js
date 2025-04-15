"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Importing file system and path modules
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Creating an instance of Prisma Client to interact with the database
const prisma = new client_1.PrismaClient();
// Function to delete all existing data from tables in the correct order
function deleteAllData(orderedFileNames) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extract model names from filenames and format them to match Prisma model names
        const modelNames = orderedFileNames.map((fileName) => {
            const modelName = path_1.default.basename(fileName, path_1.default.extname(fileName));
            return modelName.charAt(0).toUpperCase() + modelName.slice(1);
        });
        // Loop through each model and delete all records
        for (const modelName of modelNames) {
            const model = prisma[modelName];
            try {
                yield model.deleteMany({});
                console.log(`Cleared data from ${modelName}`);
            }
            catch (error) {
                console.error(`Error clearing data from ${modelName}:`, error);
            }
        }
    });
}
// Main seeding function
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Define the directory path where JSON seed data files are located
        const dataDirectory = path_1.default.join(__dirname, 'seedData');
        // Ordered list of filenames to ensure correct seeding sequence
        const orderedFileNames = [
            'team.json',
            'user.json',
            'project.json',
            'projectTeam.json',
            'task.json',
            'attachment.json',
            'comment.json',
            'taskAssignment.json',
        ];
        // First clear existing data from the database
        yield deleteAllData(orderedFileNames);
        // Loop through each JSON file and seed data into the corresponding model
        for (const fileName of orderedFileNames) {
            const filePath = path_1.default.join(dataDirectory, fileName);
            // Read and parse JSON data from the file
            const jsonData = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
            // Get the model name from the file name
            const modelName = path_1.default.basename(fileName, path_1.default.extname(fileName));
            const model = prisma[modelName];
            try {
                // Create entries in the database for each data item
                for (const data of jsonData) {
                    yield model.create({ data });
                }
                console.log(`Seeded ${modelName} with data from ${fileName}`);
            }
            catch (error) {
                console.error(`Error seeding data for ${modelName}:`, error);
            }
        }
    });
}
// Run the main function, handle errors and disconnect Prisma client
main()
    .catch((e) => console.error(e))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.$disconnect(); }));
