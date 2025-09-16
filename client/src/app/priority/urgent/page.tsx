import React from 'react';
import ReusablePriorityPage from '../reusablePriorityPages';
import { Priority } from '@/state/models/task';

const Urgent = () => {
	return <ReusablePriorityPage priority={Priority.Urgent} />;
};

export default Urgent;
