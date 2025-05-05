'use client';

import React, { use, useState } from 'react';
import ProjectHeader from '@/app/projects/projectHeader';
import BoardView from '../BoardView';
import ListView from '../ListView';
import Timeline from '../TimelineView';

type Props = {
	params: Promise<{ id: string }>;
};

const Project = ({ params }: Props) => {
	const { id } = use(params);
	const [activeTab, setActiveTab] = useState('Board');
	const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

	return (
		<div>
			<ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

			{activeTab === 'Board' && (
				<BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
			)}
			{activeTab === 'List' && (
				<ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
			)}
			{activeTab === 'Timeline' && (
				<Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
			)}
		</div>
	);
};

export default Project;
