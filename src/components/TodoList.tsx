import { useState } from "react";
import Todo from "./Todo";
type todo = {
	ID: string | number;
	content: string;
	finished?: boolean;
	deleted?: boolean;
};
const todosData: todo[] = [
	{ ID: "1", content: "todo1" },
	{ ID: "2", content: "todo2" },
	{ ID: "3", content: "todo3" },
];
const TodoList = () => {
	// const [deleted, setDeleted] = useState(false);
	const deleteTODO = (id: string | number) => {
		setTodos([...todos.filter((todo) => todo.ID !== id)]);
	};
	const [todos, setTodos] = useState(todosData);
	const [newTodo, setNewTodo] = useState<todo>({ ID: "none", content: "" });
	const handleNewTodo = () => {
		if (newTodo.content !== "") {
			setTodos([...todos, newTodo]);

			setNewTodo({ ID: "none", content: "" });
		}
	};
	const editTodo = (id: string | number, newContent: string) => {
		const updatedTodos = todos.map((todo) => (todo.ID === id ? { ...todo, content: newContent } : todo));
		setTodos(updatedTodos);
	};
	return (
		<section className="bg-[#000333] text-white ">
			<h1 className="py-4 text-center font-medium text-4xl border-b-2 drop-shadow-md drop-shadow-white">TO-DONE!</h1>
			<div className="flex justify-center items-center gap-2 p-2">
				<input
					value={newTodo.content}
					onChange={(e) => {
						setNewTodo({ content: e.target.value, ID: todos.length + 1 });
					}}
					type="text"
					placeholder="add to-do"
					className="text-black px-2 py-1 rounded-sm"
				/>
				<button onClick={handleNewTodo} className=" px-2 py-1 rounded-sm bg-blue-500 hover:bg-blue-700 transition-all ">
					add a to-do
				</button>
			</div>
			<div className=" grid gap-2 p-4 place-items-center">
				{todos.map((todo, index) => (
					<Todo setDeleted={deleteTODO} editTodo={editTodo} key={index} content={todo.content} ID={todo.ID} />
				))}
			</div>
		</section>
	);
};

export default TodoList;
