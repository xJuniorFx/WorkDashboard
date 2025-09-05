import { Project } from '@/state/models/project';
import React from 'react';

type Props = {
	project: Project;
};

const ProjectCard = ({ project }: Props) => {
	return (
		<div className="rounded-2xl bg-white p-4 shadow-md transition hover:shadow-lg dark:bg-dark-secundary dark:text-white dark:hover:shadow-white/20">
			<h3>{project.name}</h3>
			<p>{project.description}</p>
			<p>Start Date: {project.startDate}</p>
			<p>End Date: {project.endDate}</p>
		</div>
	);
};

export default ProjectCard;
