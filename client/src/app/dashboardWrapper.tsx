'use client';

import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StoreProvider, { useAppSelector } from './redux';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const isSidebarCollapsed = useAppSelector(
		(state) => state.global.isSideBarCollapsed
	);
	const isDarkModeActive = useAppSelector(
		(state) => state.global.isDarkModeActive
	);

	return (
		<div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
			{/* sidebar */}
			<Sidebar />
			<main
				className={'flex w-full flex-col  bg-gray-50 dark:bg-dark-bg md:pl-64'}
			>
				<Navbar />
				{children}
			</main>
		</div>
	);
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<StoreProvider>
			<DashboardLayout>{children}</DashboardLayout>
		</StoreProvider>
	);
};

export default DashboardWrapper;
