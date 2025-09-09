'use client';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSideBarCollapsed } from '@/state/slices/globalSlice';
import {
	CalendarRange,
	House,
	LockIcon,
	Search,
	Settings,
	User,
	Users,
	X,
} from 'lucide-react';
import Image from 'next/image';

import SidebarLink from './sidebarLink';
import SidebarProjectsSection from './sidebarProjectsSection';
import SidebarPrioritiesSection from './sidebarPrioritiesSection';

const Sidebar = () => {
	const dispatch = useAppDispatch();
	const isSideBarCollapsed = useAppSelector(
		(state) => state.global.isSideBarCollapsed
	);

	const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 
		dark:bg-black overflow-y-auto bg-white ${
			isSideBarCollapsed ? 'w-0 hidden' : 'w-3/10'
		} `;

	return (
		<div className={sidebarClassNames}>
			<div className="flex h-[100%] w-full flex-col justify-start">
				{/* TOP LOGO */}
				<div className="z-50 flex min-h-[45px] w-64 items-center justify-between bg-white px-[1.5rem] pt-3 pb-1 dark:bg-black">
					<div className="text-xl font-bold text-gray-700 dark:text-white">
						Orion
					</div>
					{isSideBarCollapsed ? null : (
						<button
							className="py-3"
							onClick={() => {
								dispatch(setIsSideBarCollapsed(!isSideBarCollapsed));
							}}
						>
							<X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
						</button>
					)}
				</div>
				{/* TEAM */}
				<div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-[1.5rem] py-4 dark:border-gray-700">
					<Image src="/logo-3.jpg" alt="Logo" width={45} height={45} priority />
					<div className="flex-row items-center">
						<h3 className="text-md font-bold dark:text-gray-200 tracking-wide">
							Menu
						</h3>
						<div className="mt-1 flex items-start gap-2">
							<LockIcon className="mt-[0.1rem] w-3 h-3 text-gray-500 dark:text-gray-400" />
							<p className="text-xs text-gray-500">Private</p>
						</div>
					</div>
				</div>
				{/* NAV BAR LINKS */}
				<nav className="z-10 w-full">
					<SidebarLink icon={House} label="House" href="/" />
					<SidebarLink icon={CalendarRange} label="Timeline" href="/timeline" />
					<SidebarLink icon={Search} label="Search" href="/search" />
					<SidebarLink icon={Settings} label="Settings" href="/settings" />
					<SidebarLink icon={User} label="Users" href="/users" />
					<SidebarLink icon={Users} label="Teams" href="/teams" />

					<SidebarProjectsSection />
					<SidebarPrioritiesSection />
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;
