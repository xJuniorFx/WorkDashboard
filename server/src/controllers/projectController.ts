import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjects = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const projects = await prisma.project.findMany();
		res.json(projects);
	} catch (error: any) {
		res
			.status(500)
			.json({ message: `Error retrieving projects: ${error.message}` });
	}
};

export const createProject = async (
	req: Request,
	res: Response
): Promise<void> => {
	console.log('[createProject] req.body:', req.body);
	const { name, description, startDate, endDate } = req.body;
	try {
		const parsedStart = startDate ? new Date(startDate) : undefined;
		const parsedEnd = endDate ? new Date(endDate) : undefined;

		console.log('[createProject] parsed dates:', parsedStart, parsedEnd);

		const newProject = await prisma.project.create({
			data: {
				name,
				description,
				startDate,
				endDate,
			},
		});
		console.log('[createProject] created project id:', newProject.id);
		res.status(201).json(newProject);
	} catch (error: any) {
		console.error('[createProject] ERROR:', error);
		res
			.status(500)
			.json({ message: `Error creating project: ${error.message}` });
	}
};
