import React from 'react';
import ReusablePriorityPage from '../reusablePriorityPages';
import { Priority } from '@/state/models/task';

const High = () => {
	return <ReusablePriorityPage priority={Priority.High} />;
};

export default High;
