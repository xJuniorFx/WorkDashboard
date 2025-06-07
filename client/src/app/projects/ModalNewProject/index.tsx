import React from 'react';
import * as yup from 'yup';
import { useCreateProjectMutation } from '@/state/api/projectService';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
	const [createProject, { isLoading }] = useCreateProjectMutation();

	return <div></div>;
};

export default ModalNewProject;
