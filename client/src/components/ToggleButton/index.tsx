'use client';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ToggleSectionButtonProps {
	label: string;
	isOpen: boolean;
	onClick: () => void;
}

const ToggleButton = ({ label, isOpen, onClick }: ToggleSectionButtonProps) => {
	return (
		<button
			onClick={onClick}
			className="flex w-full items-center justify-between px-8 py-3 text-gray-700 dark:text-gray-300"
		>
			<span>{label}</span>
			{isOpen ? (
				<ChevronUp className="h-5 w-5" />
			) : (
				<ChevronDown className="h-5 w-5" />
			)}
		</button>
	);
};

export default ToggleButton;
