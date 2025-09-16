import React from 'react';
import ReusablePriorityPage from '../reusablePriorityPages';
import { Priority } from '@/state/models/task';

const Backlog = () => {
	return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default Backlog;
