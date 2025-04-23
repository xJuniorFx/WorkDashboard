'use client';
import { useState } from 'react';
import { BookText } from 'lucide-react';
import { useGetProjectsQuery } from '@/state/api/projectService';
import SidebarLink from './sidebarLink';
import ToggleButton from '../ToggleButton';

const SidebarProjectsSection = () => {
	const [show, setShow] = useState(false);
	const { data: projects } = useGetProjectsQuery();

	return (
		<>
			<ToggleButton
				label="Projects"
				isOpen={show}
				onClick={() => setShow((prev) => !prev)}
			/>
			{show &&
				projects?.map((project) => (
					<SidebarLink
						key={project.id}
						href={`/projects/${project.id}`}
						icon={BookText}
						label={project.name}
					/>
				))}
		</>
	);
};

export default SidebarProjectsSection;
