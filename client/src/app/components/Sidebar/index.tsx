'use client';
import { LockIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const Sidebar = () => {
	const [ShowCondominios, SetShowCondominios] = useState<boolean>(true);
	const [ShowPriority, SetShowPriority] = useState<boolean>(true);

	const sidebarClassNames =
		' fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-60 dark:bg-black overflow-y-auto bg-white w-64';

	return (
		<div className={sidebarClassNames}>
			<div className="flex h-[100%] w-full flex-col justify-start">
				{/* TOP LOGO */}
				<div className="z-50 flex min-h-[45px] w-64 items-center justify-between bg-white px-[1.5rem] pt-3 dark:bg-black">
					<div className="text-xl font-bold text-gray-900 dark:text-white">
						Orion
					</div>
				</div>
				{/* TEAM */}
				<div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-[1.5rem] py-4 dark:border-gray-700">
					<Image src="/logo-3.jpg" alt="Logo" width={45} height={45} />
					<div className="flex-row items-center">
						<h3 className="text-md font-bold dark:text-gray-200 dark:text-white tracking-wide">
							Menu
						</h3>
						<div className="mt-1 flex items-start gap-2">
							<LockIcon className="mt-[0.1rem] w-3 h-3 text-gray-500 dark:text-gray-400" />
							<p className="text-xs text-gray-500">Private</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
