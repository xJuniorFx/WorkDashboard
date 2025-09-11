import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../Header';
import { X } from 'lucide-react';

type Props = {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	name: string;
};

const Modal = ({ children, isOpen, onClose, name }: Props) => {
	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className="fixed inset-0 z-50 flex w-full h-full items-center justify-center overflow-y-auto bg-gray-700 bg-opacity-70 p-4">
			<div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secundary">
				<Header
					name={name}
					isSmallText
					buttoComponent={
						<button
							className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1f2937] text-white hover:bg-[#9ba1a6] dark:bg-[#c8cace] dark:hover:bg-[#d0d2d5]"
							onClick={onClose}
						>
							<X size={16} />
						</button>
					}
				/>
				{children}
			</div>
		</div>,
		document.body
	);
};

export default Modal;
