import React from 'react';
import { useCreateProjectMutation } from '@/state/api/projectService';
import { formatISO } from 'date-fns';
import Modal from '@/components/Modal';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const projectSchema = z
	.object({
		name: z.string().min(3, 'Project name is Required'),
		description: z.string().min(1, 'Description is Required'),
		startDate: z.coerce.date({
			required_error: 'Start date is required',
			invalid_type_error: 'Invalid start date',
		}),
		endDate: z.coerce.date({
			required_error: 'End date is required',
			invalid_type_error: 'Invalid end date',
		}),
	})
	.refine((data) => data.endDate >= data.startDate, {
		path: ['endDate'],
		message: 'End date cannot be before start date',
	});

type formData = z.infer<typeof projectSchema>;

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
	const [createProject, { isLoading }] = useCreateProjectMutation();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<formData>({
		resolver: zodResolver(projectSchema),
		mode: 'onChange',
	});

	const onSubmit = async (data: formData) => {
		await createProject({
			...data,
			name: data.name,
			description: data.description,
			startDate: formatISO(new Date(data.startDate)),
			endDate: formatISO(new Date(data.endDate)),
		});
		reset();
	};

	const renderError = (field: keyof formData) => {
		const error = errors[field];
		return error ? (
			<p className="text-red-500 text-sm">{error.message}</p>
		) : null;
	};

	const inputStyles =
		'w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none';

	return (
		<Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
			<form className="mt-4 space-y-6" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<input
						type="text"
						placeholder="Project Name"
						className={inputStyles}
						{...register('name')}
					/>
					{renderError('name')}
				</div>
				<div>
					<textarea
						placeholder="Description"
						className={inputStyles}
						{...register('description')}
					/>
					{renderError('description')}
				</div>
				<div className="grid grid-col-1 gap-4 sm:grid-cols-2 sm:gap-2">
					<div>
						<input
							type="date"
							className={inputStyles}
							{...register('startDate')}
						/>
						{renderError('startDate')}
					</div>
					<div>
						<input
							type="date"
							className={inputStyles}
							{...register('endDate')}
						/>
						{renderError('endDate')}
					</div>
				</div>
				<button
					type="submit"
					className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium
						text-white shadow-sm focus:outline-none focus:ring-2 
						bg-[#1f2937] hover:bg-[#9ba1a6]  focus:ring-[#9ba1a6]
						dark:bg-[#b1b3b7] dark:hover:bg-[#d0d2d5] dark:focus:ring-[#d0d2d5]${
							!isValid || isLoading ? 'cursor-not-allowed opacity-50' : ''
						} `}
					disabled={!isValid || isLoading}
				>
					{isLoading ? 'Creating ...' : 'Create Project'}
				</button>
			</form>
		</Modal>
	);
};

export default ModalNewProject;
