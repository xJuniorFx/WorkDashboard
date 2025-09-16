import React from 'react';
import ReusablePriorityPage from '../reusablePriorityPages';
import { Priority } from '@/state/models/task';

const Medium = () => {
	return <ReusablePriorityPage priority={Priority.Medium} />;
};

export default Medium;
