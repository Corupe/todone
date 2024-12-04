import TodoList from "./components/TodoList";
import { motion } from "framer-motion";
function App() {
	return (
		<main className="overflow-hidden bg-[#000333] h-screen min-h-max">
			<motion.div initial={{ opacity: 0, x: -1000 }} animate={{ opacity: 100, x: 0 }}>
				<TodoList />
			</motion.div>
		</main>
	);
}

export default App;
