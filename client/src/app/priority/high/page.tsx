import React from 'react';
import ReusablePriorityPage from '../reusablePriorityPages';
import { Priority } from '@/state/models/task';

type Props = {};

const High = (props: Props) => {
	return <ReusablePriorityPage priority={Priority.High} />;
};

export default High;
