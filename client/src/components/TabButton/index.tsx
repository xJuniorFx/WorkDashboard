import React from 'react';

type Props = {
	name: string;
	icon: React.ReactNode;
	setActiveTab: (tabName: string) => void;
	activeTab: string;
};

const TabButton = ({ name, icon, setActiveTab, activeTab }: Props) => {
	const isActive = activeTab === name;

	return (
		<button
			className={`relative flex items-center gap-1 px-2 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full dark:text-gray-400 hover:text-blue-600 dark:hover:text-white sm:px-2 lg:px-4 ${
				isActive ? 'text-blue-600 after:bg-blue-600 dark:text-white' : ''
			}`}
			onClick={() => setActiveTab(name)}
		>
			{icon}
			{name}
		</button>
	);
};

export default TabButton;
