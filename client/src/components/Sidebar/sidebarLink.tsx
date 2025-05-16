'use client';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/redux';

interface SidebarLinkProps {
	href: string;
	icon: LucideIcon;
	label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
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
				className={`justify-start px-8 py-3 relative flex cursor-pointer items-center gap-3 transition-colors
				hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 
				${isActive ? 'bg-gray-200 text-white dark:bg-gray-600' : ''}`}
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

export default SidebarLink;
