import React, { useState } from 'react';
import * as yup from 'yup';
import { useCreateProjectMutation } from '@/state/api/projectService';
import { formatISO } from 'date-fns';
import Modal from '@/components/Modal';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
	const [createProject, { isLoading }] = useCreateProjectMutation();
	const [projectName, setProjectName] = useState('');
	const [description, setDescription] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, serenddDate] = useState('');

	const handleSubmit = async () => {
		if (!projectName || !startDate || !endDate) return;

		const formattedStartDate = formatISO(new Date(startDate), {
			representation: 'complete',
		});

		const formattedEndDate = formatISO(new Date(endDate), {
			representation: 'complete',
		});

		await createProject({
			name: projectName,
			description,
			startDate: formattedStartDate,
			endDate: formattedEndDate,
		});
	};

	const isFormValid = () => {
		return projectName && description && startDate && endDate;
	};

	const inputStyles =
		'w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none';

	return (
		<Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
			<form
				className="mt-4 space-y-6"
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			></form>
		</Modal>
	);
};

export default ModalNewProject;
