import React from 'react';
import ReusablePriorityPage from '../reusablePriorityPages';
import { Priority } from '@/state/models/task';

const Low = () => {
	return <ReusablePriorityPage priority={Priority.Low} />;
};

export default Low;
