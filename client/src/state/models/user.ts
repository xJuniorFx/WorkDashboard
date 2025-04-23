export interface User {
	userId: number;
	username: string;
	email: string;
	profilePicture?: string;
	cognitoId?: string;
	teamId?: number;
}
