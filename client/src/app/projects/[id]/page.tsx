'use client';

import React, { use, useState } from 'react';
import ProjectHeader from '@/app/projects/projectHeader';

type Props = {
	params: Promise<{ id: string }>;
};

const Project = ({ params }: Props) => {
	const { id } = use(params);
	const { activeTab, setActiveTab } = useState('Board');
	const { isModalNewTaskOpen, setModalNewTaskOpen } = useState<boolean>(false);

	return (
		<div>
			<ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
		</div>
	);
};

export default Project;
