import { useState } from "react";
import { twMerge } from "tailwind-merge";

export type TodoProps = {
	ID: string | number;
	content: string;
	finished?: boolean;
	deleted?: boolean;
	editTodo?: (id: string | number, newContent: string) => void;
};

const Todo = ({ content, editTodo, ID }: TodoProps) => {
	const [checked, setChecked] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [newContent, setNewContent] = useState("");
	const [editMode, setEditMode] = useState(false);
	return (
		<div className={twMerge(deleted ? "opacity-15" : "", "w-96 max-w-96 flex gap-2 justify-between items-center ")}>
			<div className="button min-w-3 flex items-center">
				<input
					disabled={editMode || deleted}
					className="w-4 h-4 "
					type="checkbox"
					name="todo-text"
					id={ID.toString()}
					checked={checked}
					onChange={() => setChecked(!checked)}
				/>
			</div>
			<div className="w-full ">
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
			</div>
			{!editMode && (
				<div className="flex gap-2 justify-between">
					<button
						onClick={() => {
							setEditMode(!editMode);
						}}
						disabled={deleted || checked}
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
							setDeleted(!deleted);
						}}
						className={twMerge(
							checked ? "opacity-20" : deleted ? "bg-yellow-500 hover:bg-yellow-700" : "bg-red-500 hover:bg-red-700",
							" transition-all text-white p-2 rounded-sm",
						)}
					>
						{deleted ? "revert" : "delete"}
					</button>
				</div>
			)}
		</div>
	);
};

export default Todo;
