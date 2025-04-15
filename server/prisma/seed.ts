import { PrismaClient } from '@prisma/client';
// Importing file system and path modules
import fs from 'fs';
import path from 'path';

// Creating an instance of Prisma Client to interact with the database
const prisma = new PrismaClient();

// Function to delete all existing data from tables in the correct order
async function deleteAllData(orderedFileNames: string[]) {
	// Extract model names from filenames and format them to match Prisma model names
	const modelNames = orderedFileNames.map((fileName) => {
		const modelName = path.basename(fileName, path.extname(fileName));
		return modelName.charAt(0).toUpperCase() + modelName.slice(1);
	});

	// Loop through each model and delete all records
	for (const modelName of modelNames) {
		const model: any = prisma[modelName as keyof typeof prisma];
		try {
			await model.deleteMany({});
			console.log(`Cleared data from ${modelName}`);
		} catch (error) {
			console.error(`Error clearing data from ${modelName}:`, error);
		}
	}
}

// Main seeding function
async function main() {
	// Define the directory path where JSON seed data files are located
	const dataDirectory = path.join(__dirname, 'seedData');

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
	await deleteAllData(orderedFileNames);

	// Loop through each JSON file and seed data into the corresponding model
	for (const fileName of orderedFileNames) {
		const filePath = path.join(dataDirectory, fileName);
		// Read and parse JSON data from the file
		const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
		// Get the model name from the file name
		const modelName = path.basename(fileName, path.extname(fileName));
		const model: any = prisma[modelName as keyof typeof prisma];

		try {
			// Create entries in the database for each data item
			for (const data of jsonData) {
				await model.create({ data });
			}
			console.log(`Seeded ${modelName} with data from ${fileName}`);
		} catch (error) {
			console.error(`Error seeding data for ${modelName}:`, error);
		}
	}
}

// Run the main function, handle errors and disconnect Prisma client
main()
	.catch((e) => console.error(e))
	.finally(async () => await prisma.$disconnect());
