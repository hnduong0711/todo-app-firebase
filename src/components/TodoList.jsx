import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    const user = auth.currentUser;
    if (user) {
      const q = query(
        collection(db, "todos", user.uid, "items"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const todosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosData);
    }
  };

  // Lấy danh sách công việc
  useEffect(() => {
    fetchTodos();
  }, []);

  // Thêm công việc
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, "todos", user.uid, "items"), {
        title: newTodo,
        completed: false,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });
      setNewTodo("");
      fetchTodos(); // Cập nhật danh sách
    }
  };

  // Cập nhật trạng thái công việc
  const handleToggleTodo = async (id, completed) => {
    const user = auth.currentUser;
    if (user) {
      const todoRef = doc(db, "todos", user.uid, "items", id);
      await updateDoc(todoRef, { completed: !completed });
      fetchTodos(); // Cập nhật danh sách
    }
  };

  // Xóa công việc
  const handleDeleteTodo = async (id) => {
    const user = auth.currentUser;
    if (user) {
      const todoRef = doc(db, "todos", user.uid, "items", id);
      await deleteDoc(todoRef);
      fetchTodos(); // Cập nhật danh sách
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Danh sách công việc
      </h2>
      <form onSubmit={handleAddTodo} className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Nhập công việc mới"
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Thêm
          </button>
        </div>
      </form>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 border rounded-md"
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id, todo.completed)}
                className="h-5 w-5"
              />
              <span className={todo.completed ? "line-through" : ""}>
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
