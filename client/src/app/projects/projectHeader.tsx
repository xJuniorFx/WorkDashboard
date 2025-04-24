import Header from '@/components/Header';
import TabButton from '@/components/TabButton';
import { Clock, Filter, Grid3x3, List, Share2, Table } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
	activeTab: string;
	setActiveTab: (tabName: string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
	const { isModalNewProjectOpen, setIstModalNewProjectOpen } =
		useState<boolean>(false);

	return (
		<div className="pl-8 pr-4 xl:pl-10">
			<div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
				<Header name={'Product Design Development'} />
			</div>
			<div className="flex flex-col gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:flex-row md:items-center md:justify-between">
				<div className="flex flex-wrap items-center gap-2 md:gap-4">
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
