'use client';

import { useState } from 'react';

const Sidebar = () => {
	const [ShowCondominios, setShowCondominios] = useState<boolean>(true);
	const [ShowPriority, SetSwowPriority] = useState<boolean>(true);

	const sidebarClassNames =
		' fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auo bg-white w-64';

	return <div className={sidebarClassNames}>SideBarT</div>;
};

export default Sidebar;
