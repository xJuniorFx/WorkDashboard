'use client';
import { useState } from 'react';
import {
	ChevronDown,
	ChevronUp,
	AlertCircle,
	ShieldAlert,
	AlertTriangle,
	AlertOctagon,
	Layers3,
} from 'lucide-react';
import SidebarLink from './sidebarLink';

const SidebarPrioritiesSection = () => {
	const [show, setShow] = useState(false);

	return (
		<>
			<button
				onClick={() => setShow((prev) => !prev)}
				className="flex w-full items-center justify-between px-8 py-3 text-gray-700 dark:text-gray-300"
			>
				<span>Priorities</span>
				{show ? (
					<ChevronUp className="h-5 w-5" />
				) : (
					<ChevronDown className="h-5 w-5" />
				)}
			</button>

			{show && (
				<nav className="z-10 w-full">
					<SidebarLink
						icon={AlertCircle}
						label="Urgent"
						href="/priority/urgent"
					/>
					<SidebarLink icon={ShieldAlert} label="High" href="/priority/high" />
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
		</>
	);
};

export default SidebarPrioritiesSection;
