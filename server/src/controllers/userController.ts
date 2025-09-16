import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users = await prisma.user.findMany({
			include: {
				team: {
					select: {
						teamName: true,
					},
				},
			},
		});

		const usersWithTeamName = users.map((user) => ({
			userId: user.userId,
			username: user.username,
			profilePictureUrl: user.profilePictureUrl,
			teamId: user.teamId,
			teamName: user.team?.teamName || 'No Team',
		}));

		res.json(usersWithTeamName);
	} catch (error: any) {
		res
			.status(500)
			.json({ message: `Error retrieving users: ${error.message}` });
	}
};

export const postUser = async (req: Request, res: Response) => {
	try {
		const { username, cognitoId, profilePictureUrl, teamId = 1 } = req.body;
		const newUser = await prisma.user.create({
			data: {
				username,
				cognitoId,
				profilePictureUrl,
				teamId,
			},
		});

		res.json({ message: 'User Created Successfully', newUser });
	} catch (error: any) {
		res
			.status(500)
			.json({ message: `Error when creating user: ${error.message}` });
	}
};
