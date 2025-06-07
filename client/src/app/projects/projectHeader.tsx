import Header from '@/components/Header';
import TabButton from '@/app/projects/BoardView/tabButton';
import {
	Clock,
	Filter,
	Grid3x3,
	List,
	PlusSquare,
	Share2,
	Table,
} from 'lucide-react';
import React, { useState } from 'react';
import ModalNewProject from './ModalNewProject';

type Props = {
	activeTab: string;
	setActiveTab: (tabName: string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
	const { isModalNewProjectOpen, setIstModalNewProjectOpen } = useState(false);

	return (
		<div className="pl-8 pr-4 xl:pl-10">
			<ModalNewProject
				isOpen={isModalNewProjectOpen}
				onClose={() => setIstModalNewProjectOpen(false)}
			/>
			<div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
				<Header
					name={'Product Design Development'}
					buttoComponent={
						<button
							className="flex items-center justify-center rounded-md bg-[#e42974] px-3 py-2 text-white hover:bg-[#801741] dark:bg-[#2563EB] dark:hover:bg-[#14357d]"
							onClick={() => setIstModalNewProjectOpen(true)}
						>
							<PlusSquare className="mr-2 h-5 w-5" />
							New Board
						</button>
					}
				/>
			</div>
			<div className="flex flex-col gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:flex-row md:items-center md:justify-between">
				<div className="flex flex-wrap items-center sm:gap-6 gap-4">
					<TabButton
						name="Board"
						icon={<Grid3x3 className="h-5 w-5" />}
						setActiveTab={setActiveTab}
						activeTab={activeTab}
					/>
					<TabButton
						name="List"
						icon={<List className="h-5 w-5" />}
						setActiveTab={setActiveTab}
						activeTab={activeTab}
					/>
					<TabButton
						name="Timeline"
						icon={<Clock className="h-5 w-5" />}
						setActiveTab={setActiveTab}
						activeTab={activeTab}
					/>
					<TabButton
						name="Table"
						icon={<Table className="h-5 w-5" />}
						setActiveTab={setActiveTab}
						activeTab={activeTab}
					/>
					<div className="flex flex-wrap items-center gap-4">
						<button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
							<Filter className="h-5 w-5" />
						</button>
						<button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
							<Share2 className="h-5 w-5" />
						</button>
						<div className="relative">
							<input
								type="text"
								placeholder="Search Task"
								className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secundary dark:bg-dark-secundary dark:text-white"
							/>
							<Grid3x3 className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectHeader;
