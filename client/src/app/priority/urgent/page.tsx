'use client';

import React from 'react';
import ReusablePriorityPage from '../reusablePriorityPages';
import { Priority } from '@/state/models/task';

type Props = {};

const Urgent = (props: Props) => {
	return <ReusablePriorityPage priority={Priority.Urgent} />;
};

export default Urgent;
