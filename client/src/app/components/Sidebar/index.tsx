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
				{/* NAV BAR LINKS */}
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
