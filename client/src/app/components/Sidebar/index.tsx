'use client';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSideBarCollapsed } from '@/state';
import {
	AlertCircle,
	AlertOctagon,
	AlertTriangle,
	Briefcase,
	ChevronDown,
	ChevronUp,
	House,
	Layers3,
	LockIcon,
	LucideIcon,
	Search,
	Settings,
	ShieldAlert,
	User,
	Users,
	X,
} from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
	const [ShowProjects, SetShowProjects] = useState<boolean>(true);
	const [ShowPriorities, SetShowPriorities] = useState<boolean>(true);

	const dispatch = useAppDispatch();
	const isSideBarCollapsed = useAppSelector(
		(state) => state.global.isSideBarCollapsed
	);

	const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-60 
		dark:bg-black overflow-y-auto bg-white ${
			isSideBarCollapsed ? 'w-0 hidden' : 'w-64'
		} `;

	return (
		<div className={sidebarClassNames}>
			<div className="flex h-[100%] w-full flex-col justify-start">
				{/* TOP LOGO */}
				<div className="z-50 flex min-h-[45px] w-64 items-center justify-between bg-white px-[1.5rem] pt-3 dark:bg-black">
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
					<SidebarLink icon={Briefcase} label="Time Line" href="/TimeLine" />
					<SidebarLink icon={Search} label="Search" href="/Search" />
					<SidebarLink icon={Settings} label="Setting" href="/Setting" />
					<SidebarLink icon={User} label="User" href="/User" />
					<SidebarLink icon={Users} label="Team" href="/Team" />
				</nav>

				{/** PROJECTS LINKS*/}
				<button
					onClick={() => SetShowProjects((prev): boolean => !prev)}
					className="flex w-full items-center justify-between px-8 py-3 text-gray-700 dark:text-gray-300"
				>
					<span className="">Projects</span>
					{ShowProjects ? (
						<ChevronUp className="h-5 w-5" />
					) : (
						<ChevronDown className="h-5 w-5" />
					)}
				</button>

				{/** PROJECTS LIST */}

				{/** PRIORITIES LIST*/}
				<button
					onClick={() => SetShowPriorities((prev): boolean => !prev)}
					className="flex w-full items-center justify-between px-8 py-3 text-gray-700 dark:text-gray-300"
				>
					<span className="">Priorities</span>
					{ShowPriorities ? (
						<ChevronUp className="h-5 w-5" />
					) : (
						<ChevronDown className="h-5 w-5" />
					)}
				</button>

				{ShowPriorities && (
					<nav className="z-10 w-full">
						<SidebarLink
							icon={AlertCircle}
							label="Urgent"
							href="/priority/urgent"
						/>
						<SidebarLink
							icon={ShieldAlert}
							label="High"
							href="/priority/high"
						/>
						<SidebarLink
							icon={AlertTriangle}
							label="Medium"
							href="/priority/medium"
						/>
						<SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
						<SidebarLink
							icon={Layers3}
							label="Backlog"
							href="/priority/backlog"
						/>
					</nav>
				)}
			</div>
		</div>
	);
};

interface SidebarLinkProps {
	href: string;
	icon: LucideIcon;
	label: string;
	//isCollapsed: boolean;
}

const SidebarLink = ({
	href,
	icon: Icon,
	label,
}: //isCollapsed,
SidebarLinkProps) => {
	const pathName = usePathname();
	const isActive =
		pathName === href || (pathName === '/' && href === '/dashboard');
	const screenWidth = window.innerWidth;

	const dispatch = useAppDispatch();
	const isSideBarCollapsed = useAppSelector(
		(state) => state.global.isSideBarCollapsed
	);

	return (
		<Link href={href} className="w-full">
			<div
				className={` justify-start px-8 py-3 relative flex cursor-pointer items-center gap-3 transition-colors
				 hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 
				 ${isActive ? 'bg-gray-100 text-white dark:bg-gray-600' : ''}`}
			>
				{isActive && (
					<div className="absolute left-0 top-0 h-[100%] w-[10px] bg-gray-950 dark:bg-gray-200" />
				)}

				<Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
				<span className="font-medium text-gray-800 dark:text-gray-100">
					{label}
				</span>
			</div>
		</Link>
	);
};

export default Sidebar;
