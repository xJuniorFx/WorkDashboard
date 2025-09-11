import React from 'react';
import ReusablePriorityPage from '../reusablePriorityPages';
import { Priority } from '@/state/models/task';

type Props = {};

const Backlog = (props: Props) => {
	return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default Backlog;
