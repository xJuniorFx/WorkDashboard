import React from 'react';
import ReusablePriorityPage from '../reusablePriorityPages';
import { Priority } from '@/state/models/task';

type Props = {};

const Medium = (props: Props) => {
	return <ReusablePriorityPage priority={Priority.Medium} />;
};

export default Medium;
