import React from 'react';

type Props = {
	name: string;
	buttoComponent?: any;
	isSmallText?: boolean;
};

const Header = ({ name, buttoComponent, isSmallText }: Props) => {
	return (
		<div className="mb-5 flex w-full">
			<div className={'w-2 rounded-s-lg bg-[#e42974] dark:bg-[#2563EB]'} />
			<div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secundary ">
				<h3 className="flex items-center text-lg font-bold dark:text-white">
					{name}
				</h3>
				<div>{buttoComponent}</div>
			</div>
		</div>
	);
};

export default Header;
