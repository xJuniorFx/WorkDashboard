import Header from '@/components/Header';
import React, { useState } from 'react';

type Props = {
	activeTab: string;
	setActiveTab: (tabName, string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
	const { isModalNewProjectOpen, setIstModalNewProjectOpen } =
		useState<boolean>(false);

	return (
		<div className="pl-8 pr-4 xl:pl-10">
			<div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
				<Header name={'Product Design Development'} />
			</div>
		</div>
	);
};

export default ProjectHeader;
