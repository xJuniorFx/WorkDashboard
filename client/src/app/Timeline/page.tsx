'use client';

import { useAppSelector } from '@/app/redux';
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react';
import React, { useMemo, useState } from 'react';
import 'gantt-task-react/dist/index.css';
import { useGetProjectsQuery } from '@/state/api/projectService';
import Header from '@/components/Header';

type TaskTypeItems = 'task' | 'milestone' | 'project';

const Timeline = () => {
	const isDarkMode = useAppSelector((state) => state.global.isDarkModeActive);

	const { data: projects, isLoading, isError } = useGetProjectsQuery();

	const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
		viewMode: ViewMode.Month,
		locale: 'en-US',
	});

	const ganttTasks = useMemo(() => {
		return (
			projects?.map((project) => ({
				start: new Date(project.startDate as string),
				end: new Date(project.endDate as string),
				name: project.name,
				id: `Project-${project.id}`,
				type: 'project' as TaskTypeItems,
				progress: 50,
				isDisabled: false,
			})) || []
		);
	}, [projects]);

	const handleViewModeChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setDisplayOptions((prev) => ({
			...prev,
			viewMode: event.target.value as ViewMode,
		}));
	};

	if (isLoading) return <div> Loading ...</div>;
	if (isError || !projects)
		return <div>An error ocurred while fetching the Projects</div>;

	return (
		<div className="max-w-full p-8">
			<Header name="Projects Timeline" />
			<header className="mb-4 flex justify-end">
				<div className="flex w-64">
					<div className={'w-2 rounded-s-lg bg-[#1f2937] dark:bg-[#aeb8c2] '} />
					<select
						className="
                        text-xl focus:shadow-outline block w-full appearance-none rounded border-gray-400 bg-white
                         px-4 py-2 pr-8 leading-tight shadow hover:border-gray-600 focus:outline
                         dark:border-dark-secundary dark:bg-dark-secundary dark:text-white 
                         "
						value={displayOptions.viewMode}
						onChange={handleViewModeChange}
					>
						<option value={ViewMode.Day}>Day</option>
						<option value={ViewMode.Week}>Week</option>
						<option value={ViewMode.Month}>Month</option>
					</select>
				</div>
			</header>
			<div className="overflow-hidden rounded-md dark:bg-dark-secundary dark:text-white">
				<div className="timeline">
					<Gantt
						key={isDarkMode ? 'dark' : 'light'}
						tasks={ganttTasks}
						{...displayOptions}
						columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
						listCellWidth="160px"
						projectBackgroundColor={isDarkMode ? '#101214' : '#9a9ea6'}
						projectProgressColor={isDarkMode ? '#1f2937' : '#c8cfd6'}
						projectProgressSelectedColor={isDarkMode ? '#000' : '#9ba1a6'}
					/>
				</div>
			</div>
		</div>
	);
};

export default Timeline;
