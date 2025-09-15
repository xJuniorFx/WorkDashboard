import { User } from '@/state/models/user';
import Image from 'next/image';
import React from 'react';

type Props = {
	user: User;
};

const UserCard = ({ user }: Props) => {
	return (
		<div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-md transition hover:shadow-lg dark:bg-dark-secundary dark:text-white dark:hover:shadow-white/20">
			{user.profilePictureUrl && (
				<Image
					src={`https://pm-s3-imgs.s3.sa-east-1.amazonaws.com/p1.jpeg`}
					alt="profile picture"
					width={32}
					height={32}
					className="rounded-full"
				/>
			)}
			<div>
				<h3>{user.username}</h3>
				<p>{user.email}</p>
			</div>
		</div>
	);
};

export default UserCard;
