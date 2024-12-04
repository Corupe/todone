import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
export type TodoProps = {
	ID: string | number;
	content: string;
	finished?: boolean;

	setDeleted: (id: string | number) => void;
	editTodo?: (id: string | number, newContent: string) => void;
};

const Todo = ({ content, editTodo, ID, setDeleted }: TodoProps) => {
	const [checked, setChecked] = useState(false);
	const [newContent, setNewContent] = useState(content);
	const [editMode, setEditMode] = useState(false);
	return (
		<motion.div
			initial={{ opacity: 0, x: -1000 }}
			animate={{ opacity: 100, x: 0 }}
			className={twMerge("w-96 max-w-96 flex gap-2 justify-between items-center ")}
		>
			<div className="button min-w-3 flex items-center">
				<motion.input
					initial={{ opacity: 0, x: -1000 }}
					animate={{ opacity: 100, x: 0 }}
					disabled={editMode}
					className="w-4 h-4 "
					type="checkbox"
					name="todo-text"
					id={ID.toString()}
					checked={checked}
					onChange={() => setChecked(!checked)}
				/>
			</div>
			<motion.div className="w-full " initial={{ opacity: 0, x: -1000 }} animate={{ opacity: 100, x: 0 }}>
				<p className={twMerge(checked ? "line-through opacity-55" : "", "font-medium")}>
					{editMode ? (
						<div className="flex justify-between items-center gap-2 ">
							<input
								type="text"
								value={newContent}
								className="text-[#000333] w-full  px-2 py-1 rounded-sm"
								onChange={(e) => setNewContent(e.target.value)}
							/>
							<button
								className="bg-green-500 hover:bg-green-700 transition-all text-white px-2 py-1 rounded-sm"
								onClick={() => {
									setEditMode(false);
									if (editTodo && newContent !== "") {
										editTodo(ID, newContent);
									}
								}}
							>
								done
							</button>
						</div>
					) : (
						<label htmlFor={ID.toString()} className="">
							{content}
						</label>
					)}
				</p>
			</motion.div>
			{!editMode && (
				<div className="flex gap-2 justify-between">
					<button
						onClick={() => {
							setEditMode(!editMode);
						}}
						disabled={checked}
						className={twMerge(
							checked ? "opacity-20" : "",
							"bg-blue-500 hover:bg-blue-700 transition-all text-white p-2 rounded-sm",
						)}
					>
						edit
					</button>
					<button
						disabled={checked}
						onClick={() => {
							setDeleted(ID);
						}}
						className={twMerge(
							checked ? "opacity-20" : "bg-red-500 hover:bg-red-700",
							" transition-all text-white p-2 rounded-sm",
						)}
					>
						delete
					</button>
				</div>
			)}
		</motion.div>
	);
};

export default Todo;
