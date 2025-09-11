import { Priority, Status } from '@/state/models/task';
import React, { useState } from 'react';
import { formatISO } from 'date-fns';
import Modal from '@/components/Modal';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateTaskMutation } from '@/state/api/taskService';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	id?: string | null;
};

const taskSchema = z
	.object({
		title: z.string().min(3, 'Title is Required'),
		description: z.string().optional(),
		status: z.nativeEnum(Status, {
			errorMap: () => ({ message: 'Select a Status' }),
		}),
		priority: z.nativeEnum(Priority, {
			errorMap: () => ({ message: 'Select a Priority' }),
		}),
		tags: z.string().optional(),
		startDate: z.coerce.date({
			required_error: 'Start date is required',
			invalid_type_error: 'Invalid start date',
		}),
		dueDate: z.coerce.date({
			required_error: 'Due date is required',
			invalid_type_error: 'Invalid due date',
		}),
		authorUserId: z.string().min(1, 'Author User ID is required'),
		assignedUserId: z.string().optional(),
		projectId: z
			.string()
			.min(1, 'Project ID is required')
			.regex(/^\d+$/, 'Project ID must be a number')
			.optional(),
	})
	.refine((data) => data.dueDate >= data.startDate, {
		path: ['dueDate'],
		message: 'Due date cannot be before start date',
	});

type FormData = z.infer<typeof taskSchema>;

const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
	const [createTask, { isLoading }] = useCreateTaskMutation();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(taskSchema),
		mode: 'onChange',
		defaultValues: {
			status: Status.ToDo,
			priority: Priority.Backlog,
		},
	});

	const handleClose = () => {
		reset();
		onClose();
	};

	const onSubmit = async (data: FormData) => {
		const finalProjectId = id !== null ? Number(id) : Number(data.projectId);
		await createTask({
			...data,
			startDate: formatISO(new Date(data.startDate)),
			dueDate: formatISO(new Date(data.dueDate)),
			projectId: finalProjectId,
			authorUserId: parseInt(data.authorUserId),
			assignedUserId: data.assignedUserId
				? parseInt(data.assignedUserId)
				: undefined,
		});
		reset();
		onClose();
	};

	const renderError = (field: keyof FormData) => {
		const error = errors[field];
		return error ? (
			<p className="text-red-500 text-sm">{error.message}</p>
		) : null;
	};

	const inputStyles =
		'w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none';

	const selectStyles =
		'mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none';

	return (
		<Modal isOpen={isOpen} onClose={handleClose} name="Create New Task">
			<form className="mt-4 space-y-6" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<input
						type="text"
						placeholder="Task Title"
						className={inputStyles}
						{...register('title')}
					/>
					{renderError('title')}
				</div>
				<textarea
					placeholder="Description"
					className={inputStyles}
					{...register('description')}
				/>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
					<div>
						<select {...register('status')} className={selectStyles}>
							{Object.values(Status).map((s) => (
								<option key={s} value={s}>
									{s}
								</option>
							))}
						</select>
						{renderError('status')}
					</div>
					<div>
						<select {...register('priority')} className={selectStyles}>
							{Object.values(Priority).map((p) => (
								<option key={p} value={p}>
									{p}
								</option>
							))}
						</select>
						{renderError('priority')}
					</div>
				</div>
				<input
					type="text"
					placeholder="Tags (Coma Separated)"
					className={inputStyles}
					{...register('tags')}
				/>
				<div className="grid grid-col-1 gap-6 sm:grid-cols-2 sm:gap-2">
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
							{...register('dueDate')}
						/>
						{renderError('dueDate')}
					</div>
				</div>
				<div>
					<input
						type="number"
						className={inputStyles}
						placeholder="Author User ID"
						{...register('authorUserId')}
					/>
					{renderError('authorUserId')}
				</div>

				<input
					type="number"
					className={inputStyles}
					placeholder="Assigned User ID"
					{...register('assignedUserId')}
				/>

				{!id && (
					<div>
						<input
							type="text"
							className={inputStyles}
							placeholder="ProjectId"
							{...register('projectId')}
						/>
						{renderError('projectId')}
					</div>
				)}
				<button
					type="submit"
					className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium
						text-white shadow-sm focus:outline-none focus:ring-2 
						bg-[#1f2937] hover:bg-[#9ba1a6]  focus:ring-[#9ba1a6]
						dark:bg-[#b1b3b7] dark:hover:bg-[#d0d2d5] dark:focus:ring-[#d0d2d5] ${
							!isValid || isLoading ? 'cursor-not-allowed opacity-50' : ''
						} `}
					disabled={!isValid || isLoading}
				>
					{isLoading ? 'Creating ...' : 'Create Task'}
				</button>
			</form>
		</Modal>
	);
};

export default ModalNewTask;
