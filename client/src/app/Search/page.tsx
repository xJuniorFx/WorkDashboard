'use client';

import Header from '@/components/Header';
import { useSearchQuery } from '@/state/api/searchService';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import TaskCard from '../projects/ListView/TaskList';
import ProjectCard from '@/components/ProjectCard';
import UserCard from '@/components/Usercard';

const Search = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const {
		data: searchResults,
		isLoading,
		isError,
	} = useSearchQuery(searchTerm, { skip: searchTerm.length < 2 });

	const handleSearch = React.useMemo(
		() =>
			debounce((event: React.ChangeEvent<HTMLInputElement>) => {
				setSearchTerm(event.target.value);
			}, 500),
		[]
	);

	useEffect(() => {
		return () => handleSearch.cancel();
	}, [handleSearch]);

	return (
		<div className="p-8">
			<Header name="Search" />
			<div>
				<input
					type="text"
					placeholder="Search..."
					className="w-1/2 rounded border p-3 shadow"
					onChange={handleSearch}
				/>
			</div>
			<div className="pt-2">
				{isLoading && <p>Loading...</p>}
				{isError && <p>Error ocurred while fetching search results.</p>}
				{!isLoading && !isError && searchResults && (
					<div className="space-y-8">
						{/* Tasks */}
						{searchResults.tasks && searchResults.tasks.length > 0 && (
							<section>
								<h2 className="p-4 text-lg font-bold  dark:text-white">
									Tasks
								</h2>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
									{searchResults.tasks.map((task) => (
										<TaskCard key={task.id} task={task} />
									))}
								</div>
							</section>
						)}

						{/* Projects */}
						{searchResults.projects && searchResults.projects.length > 0 && (
							<section>
								<h2 className="p-4 text-lg font-bold  dark:text-white">
									Projects
								</h2>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
									{searchResults.projects.map((project) => (
										<ProjectCard key={project.id} project={project} />
									))}
								</div>
							</section>
						)}

						{/* Users */}
						{searchResults.users && searchResults.users.length > 0 && (
							<section>
								<h2 className="p-4 text-lg font-bold  dark:text-white">
									Users
								</h2>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
									{searchResults.users.map((user) => (
										<UserCard key={user.userId} user={user} />
									))}
								</div>
							</section>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Search;
