import { useAppSelector } from '@/app/redux';
import { useGetTasksQuery } from '@/state/api/taskService';
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react';
import React, { useMemo, useState } from 'react';
import 'gantt-task-react/dist/index.css';

type TimeLineProps = {
	id: string;
	setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = 'task' | 'milestone' | 'project';

const TimelineView = ({ id, setIsModalNewTaskOpen }: TimeLineProps) => {
	const isDarkMode = useAppSelector((state) => state.global.isDarkModeActive);

	const {
		data: tasks,
		isLoading,
		error,
	} = useGetTasksQuery({ projectId: Number(id) });

	const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
		viewMode: ViewMode.Month,
		locale: 'en-US',
	});

	const ganttTasks = useMemo(() => {
		return (
			tasks?.map((task) => ({
				start: new Date(task.startDate as string),
				end: new Date(task.dueDate as string),
				name: task.title,
				id: `Task-${task.id}`,
				type: 'ask' as TaskTypeItems,
				progress: task.points ? (task.points / 10) * 100 : 0,
				isDisabled: false,
			})) || []
		);
	}, [tasks]);

	const handleViewModeChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setDisplayOptions((prev) => ({
			...prev,
			viewMode: event.target.value as ViewMode,
		}));
	};

	if (isLoading) return <div> Loading ...</div>;
	if (error) return <div>An error ocurred while fetching the tasks</div>;

	return (
		<div className="px-4 xl:px-6">
			<div className="flex flex-wrap items-center justify-between gap-2 py-5">
				<button
					className="flex items-center rounded bg-[#1f2937] px-3 py-2 text-white hover:bg-[#9ba1a6] dark:bg-[#7b808a] dark:hover:bg-[#c8cace]"
					onClick={() => setIsModalNewTaskOpen(true)}
				>
					Add New Task
				</button>
				<div className="flex w-64">
					<div className={'w-2 rounded-s-lg bg-[#1f2937] dark:bg-[#aeb8c2] '} />
					<select
						className="
                        focus:shadow-outline block w-full appearance-none rounded border-gray-400 bg-white
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
			</div>
			<div className="overflow-x-auto rounded-md dark:bg-dark-secundary dark:text-white">
				<div className="timeline">
					<div className="min-w-[1000px] sm:min-w-[800px]">
						<Gantt
							key={isDarkMode ? 'dark' : 'light'}
							tasks={ganttTasks}
							{...displayOptions}
							columnWidth={
								displayOptions.viewMode === ViewMode.Month ? 150 : 100
							}
							listCellWidth="160px"
							projectBackgroundColor={isDarkMode ? '#000000' : '#000000'}
							barBackgroundSelectedColor={isDarkMode ? '#aeb8c2' : '#1f2937'}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TimelineView;
