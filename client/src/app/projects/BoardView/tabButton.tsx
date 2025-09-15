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
			className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[3px] after:w-full hover:text-[#0d1015] dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${
				isActive
					? ' after:bg-[#1f2937] dark:after:bg-[#aeb8c2] dark:text-white'
					: ''
			}`}
			onClick={() => setActiveTab(name)}
		>
			{icon}
			{name}
		</button>
	);
};

export default TabButton;
