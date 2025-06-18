import { Priority, Status } from '@/state/models/task';
import React from 'react';
import { formatISO } from 'date-fns';
import Modal from '@/components/Modal';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateTaskMutation } from '@/state/api/taskService';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	id: number;
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
		authorUserId: z.coerce.number().min(1, 'Author is required'),
		assignedUserId: z.coerce.number().optional(),
		projectId: z.coerce.number(),
	})
	.refine((data) => data.dueDate >= data.startDate, {
		path: ['dueDate'],
		message: 'Due date cannot be before start date',
	});

type taskFormData = z.infer<typeof taskSchema>;

const ModalNewTask = ({ isOpen, onClose, id }: Props) => {
	const [createTask, { isLoading }] = useCreateTaskMutation();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<taskFormData>({
		resolver: zodResolver(taskSchema),
		mode: 'onChange',
	});

	const onSubmit = async (data: taskFormData) => {
		await createTask({
			...data,
			title: data.title,
			description: data.description,
			status: data.status,
			priority: data.priority,
			tags: data.tags,
			startDate: formatISO(new Date(data.startDate)),
			dueDate: formatISO(new Date(data.dueDate)),
			authorUserId: data.authorUserId,
			assignedUserId: data.assignedUserId,
			projectId: Number(id),
		});
		reset();
	};

	const renderError = (field: keyof taskFormData) => {
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
		<Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
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
						<select className={selectStyles} {...register('status')}>
							{Object.values(Status).map((s) => (
								<option key={s} value={s}>
									{s}
								</option>
							))}
						</select>
						{renderError('status')}
					</div>
					<div>
						<select className={selectStyles} {...register('priority')}>
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
						type="text"
						className={inputStyles}
						placeholder="Author User ID"
						{...register('authorUserId')}
					/>
					{renderError('authorUserId')}
				</div>
				<input
					type="text"
					className={inputStyles}
					placeholder="Assigned User ID"
					{...register('assignedUserId')}
				/>
				<button
					type="submit"
					className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium
						text-white shadow-sm focus:outline-none focus:ring-2 
						bg-[#e42974] hover:bg-[#801741]  focus:ring-[#801741]
						dark:bg-[#2563EB] dark:hover:bg-[#14357d] dark:focus:ring-[#14357d] ${
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
