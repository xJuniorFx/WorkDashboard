import React from 'react';
import { Menu, Moon, Search, Settings, Sun } from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import {
	setIsDarkModeActive,
	setIsSideBarCollapsed,
} from '@/state/slices/globalSlice';

const Navbar = () => {
	const dispatch = useAppDispatch();
	const isSideBarCollapsed = useAppSelector(
		(state) => state.global.isSideBarCollapsed
	);
	const isDarkModeActive = useAppSelector(
		(state) => state.global.isDarkModeActive
	);

	return (
		<div className="flex items-center justify-between bg-white pl-8 pr-4 py-3 dark:bg-black">
			{/* Search Bar */}
			<div className="flex items-center gap-8">
				{!isSideBarCollapsed ? null : (
					<button
						onClick={() => dispatch(setIsSideBarCollapsed(!isSideBarCollapsed))}
					>
						<Menu className="h-8 w-8 dark:text-white" />
					</button>
				)}
				<div className="relative flex h-min w-[200px]">
					<Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
					<input
						className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white"
						type="Search"
						placeholder="Search..."
					/>
				</div>
			</div>
			{/** Icons */}
			<div className="flex gap-2 items-center">
				<button
					onClick={() => dispatch(setIsDarkModeActive(!isDarkModeActive))}
					className={
						isDarkModeActive
							? `rounded h-min w-min p-2  dark:hover: bg-gray-700`
							: `rounded h-min w-min p-2 hover:bg-gray-100`
					}
				>
					{isDarkModeActive ? (
						<Sun className="h-6 w-6 cursor-pointer dark:text-white" />
					) : (
						<Moon className="h-6 w-6 cursor-pointer dark:text-white" />
					)}
				</button>
				<Link
					href="/settings"
					className="h-min w-min rounded p-2 hover:bg-gray-100"
				>
					<Settings className="h-6 w-6 cursor-pointer dark:text-white" />
				</Link>
				<div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
			</div>
		</div>
	);
};

export default Navbar;
